"use strict";

var otpSent = {
	sts: 1
};

module.exports = function(req, res) {
    console.log("--- inside app_register_handler");
    console.log(req.body);
		if (req.body) {
				res.json(otpSent);
		} else {
				res.json({sts: 0, err_code: "inv", err_msg: "invalid parameters"});
		}
};

function validateRequestParameters(params) {

}
