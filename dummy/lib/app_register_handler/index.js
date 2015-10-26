"use strict";

var otpSent = {
	sts: 1
};

module.exports = function(req, res) {
    console.log("--- inside app_register_handler");
    console.log(req.body);
    res.json(otpSent);
};
