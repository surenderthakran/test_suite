'use strict';

var express = require('express');
var router = express.Router();
var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
// var cookieParser = require('cookie-parser');
var session = require('express-session');

var config = {
	GOOGLE_CLIENT_ID: "##############################################################",
    GOOGLE_CLIENT_SECRET: "##############################",
    GOOGLE_CALLBACK_URL: "http://127.0.0.1:9999/auth/google/callback"
};

var AUTH_CONFIG = {
	roles: {
		admin: [
			"test@gmail.com"
		],
		operator: []
	}
};

passport.use(new GoogleStrategy({  
        clientID: config.GOOGLE_CLIENT_ID,
        clientSecret: config.GOOGLE_CLIENT_SECRET,
        callbackURL: config.GOOGLE_CALLBACK_URL
    },
    function(accessToken, refreshToken, profile, done) {
    	console.log(1);
    	console.log(accessToken);
    	console.log(profile);

    	var eid = getEmailIDFromProfile(profile);
    	console.log(eid);

    	if (isUserAllowed) {
    		return done(null, profile);
    	} else {
    		return done(null, false);
    	}
    }
));

// router.use(cookieParser());
router.use(session({
  secret: 'worldiscrazy',
  resave: true,
  saveUninitialized: false
}));
router.use(passport.initialize());
router.use(passport.session());

passport.serializeUser(function(user, done) {  
	console.log("inside serializeUser()");
	console.log(user);
	var profile = {
		id: user.id,
		name: user.displayName,
		email: user.emails[0]["value"],
		photos: user.photos,
		domain: user._json.domain
	};
    // done(null, user.id);
    done(null, profile);
});

passport.deserializeUser(function(id, done) {  
	console.log("inside deserializeUser()");
	console.log(id);
    done(null, id);
});

router.get('/admin/login', passport.authenticate('google',  
    { scope: ['https://www.googleapis.com/auth/userinfo.profile',
      'https://www.googleapis.com/auth/userinfo.email'] }),
    function(req, res){} // this never gets called
);

router.get('/auth/google/callback', passport.authenticate('google',  
    { failureRedirect: '/' }
), function (req, res) {
	console.log("inside /auth/google/callback handler successRedirect");
	res.redirect("/home.html");
});

router.use(function (req, res, next) {
	console.log("\n=====================================================");
	console.log(req.url);
    ensureAuthenticated(req, res, function (isAuthenticated) {
    	console.log("inside ensureAuthenticated() callback");
    	if (isAuthenticated === true) {
    		if (req.url === "/") {
    			res.redirect("/home.html");
    		} else {
    			next();
    		}
    	} else {
    		res.sendFile(__dirname + "/views/index.html");
    	}
    });
});

router.use(express.static(__dirname + "/views"));

router.get('/api', function(req, res) {
	console.log("inside /api handler");
	console.log(req.user.name);
	console.log(req.user.email);
    res.json({ message: 'Hooray! welcome to our api!' });
});

module.exports = router;

function ensureAuthenticated(req, res, callback) {  
	console.log("inside ensureAuthenticated()");
	var isAuthenticated = req.isAuthenticated();
	console.log(isAuthenticated);
    if (isAuthenticated) { 
    	callback(true);
    } else {
    	callback(false);
    }
}

function getEmailIDFromProfile(profile) {
	return profile.emails[0]["value"];
}

function isUserAllowed(eid) {
	for (var role in AUTH_CONFIG.roles) {
		for (var user in AUTH_CONFIG.roles.role) {
			if (user === eid) {
				return true;
			}
		}
	}
	return false;
}
