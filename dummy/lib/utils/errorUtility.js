"use strict";

var internals = {};

internals.errorConfig = {
	inv: {
		msg: "Invalid Parameters"
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
