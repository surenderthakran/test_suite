"use strict";

var express = require('express');
var bodyParser = require('body-parser');

var router = express.Router();

var appRegisterHandler = require("../lib/handlers/app_register_handler");
var otpAuthHandler = require("../lib/handlers/otp_auth_handler");
var homeContentHandler = require("../lib/handlers/home_content_handler");
var categoryContentHandler = require("../lib/handlers/category_content_handler");
var assetContentHandler = require("../lib/handlers/asset_content_handler");
var brochureListHandler = require("../lib/handlers/brochure_list_handler");
var brochureAddHandler = require("../lib/handlers/brochure_add_handler");
var brochureContentHandler = require("../lib/handlers/brochure_content_handler");

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

router.use(express.static(__dirname + '/../public'));

router.post('/v0/service/authorisation/app_register', function (req, res) {
		appRegisterHandler(req, res);
});

router.post('/v0/service/authorisation/otp_auth', function (req, res) {
		otpAuthHandler(req, res);
});

router.post('/v0/data/app/home_content', function (req, res) {
		homeContentHandler(req, res);
});

router.post('/v0/data/category_content', function (req, res) {
		categoryContentHandler(req, res);
});

router.post('/v0/data/asset_content', function (req, res) {
		assetContentHandler(req, res);
});

router.post('/v0/data/brochure_list', function (req, res) {
		brochureListHandler(req, res);
});

router.post('/v0/data/brochure_add', function (req, res) {
		brochureAddHandler(req, res);
});

router.post('/v0/data/brochure_content', function (req, res) {
  	brochureContentHandler(req, res);
});

module.exports = router;
