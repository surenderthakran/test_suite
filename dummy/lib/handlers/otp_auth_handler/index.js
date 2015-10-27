"use strict";

var errorUtility = require("../../utils/errorUtility.js");

var successResponse = {
    sts: 1,
    id_token: "6c84fb90-12c4-11e1-840d-7b25c5ee775a",
    slt: "Mr",
    dst_id: "abc123",
    fnm: "First",
    lnm: "Last",
    eid: "test@test.com",
    dob: "15-08-1947"
};

function validateRequestParameters(params) {
    console.log("inside validateRequestParameters()");
	console.log(params);
	if(params.mno && params.otp) {
        if (params.otp === "0000") {
            return successResponse;
        } else {
            return errorUtility.buildErrorResponse("inv_otp");
        }
	} else {
		return errorUtility.buildErrorResponse("inv_prm");
	}
}

module.exports = function(req, res) {
    console.log("--- inside otp_auth_handler");
    console.log(req.body);
	if (req.body) {
		res.json(validateRequestParameters(req.body));
	} else {
		res.json(errorUtility.buildErrorResponse("inv_prm"));
	}
};
