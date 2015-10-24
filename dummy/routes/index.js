"use strict";

var express = require('express');
var bodyParser = require('body-parser');

var router = express.Router();

var appRegister = require("../lib/app_register.js");
var otpAuth = require("../lib/otp_auth.js");
var homeContent = require("../lib/home_content.js");
var categoryContent = require("../lib/category_content.js");
var assetContent = require("../lib/asset_content.js");
var brochureList = require("../lib/brochure_list.js");
var brochureAdd = require("../lib/brochure_add.js");
var brochureContent = require("../lib/brochure_content.js");

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

router.use(express.static('public'));

router.post('/v0/service/authorisation/app_register', function (req, res) {
	console.log(req.body);
  	res.json(appRegister);
});

router.post('/v0/service/authorisation/otp_auth', function (req, res) {
	console.log(req.body);
  	res.json(otpAuth);
});

router.post('/v0/data/app/home_content', function (req, res) {
	console.log(req.body);
  	res.json(homeContent);
});

router.post('/v0/data/category_content', function (req, res) {
	console.log(req.body);
  	res.json(categoryContent);
});

router.post('/v0/data/asset_content', function (req, res) {
	console.log(req.body);
  	res.json(assetContent);
});

router.post('/v0/data/brochure_list', function (req, res) {
	console.log(req.body);
  	res.json(brochureList);
});

router.post('/v0/data/brochure_add', function (req, res) {
	console.log(req.body);
  	res.json(brochureAdd);
});

router.post('/v0/data/brochure_content', function (req, res) {
	console.log(req.body);
  	res.json(brochureContent);
});

module.exports = router;
