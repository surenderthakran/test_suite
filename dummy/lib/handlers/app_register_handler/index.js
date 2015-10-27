"use strict";

var errorUtility = require("../../utils/errorUtility.js");

var successResponse = {
	sts: 1
};

function validateRequestParameters(params) {
	console.log("inside validateRequestParameters()");
	console.log(params);
	if(params.mno) {
		return successResponse;
	} else {
		return errorUtility.buildErrorResponse("inv_prm");
	}
}

module.exports = function(req, res) {
    console.log("--- inside app_register_handler");
    console.log(req.body);
	if (req.body) {
		res.json(validateRequestParameters(req.body));
	} else {
		res.json(errorUtility.buildErrorResponse("inv_prm"));
	}
};
