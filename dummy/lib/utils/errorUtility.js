"use strict";

var internals = {};

internals.errorConfig = {
	"inv_prm": {
		msg: "Invalid Parameters"
	},
    "inv_otp": {
		msg: "Invalid OTP Code"
	}
};

internals.buildErrorResponse = function(errCode) {
    console.log("inside buildErrorResponse()");
	var response = {
		sts: 0
	};
	if (internals.errorConfig[errCode]) {
		response.err_code = errCode;
		response.err_msg = internals.errorConfig[errCode]["msg"];
	}
    console.log(response);
	return response;
};

module.exports = internals;
