"use strict";

var errorUtility = require("../../utils/errorUtility.js");

var successResponse = {
	eid : [
		{
			id: "saurav.singh@mymail.com",
			type: "Support Desk"
		},
		{
			id: "saurav.singh@mycompany.com",
			type: "Support Desk"
		}
	],
	phn: [
    	{
			isd: "+91",
        	num: "9999999999",
        	type: "Support Desk"
    	},
    	{
			isd: "+91",
        	num: "8888888888",
        	type: "Support Desk"
    	}
	]
};

function validateRequestParameters(params) {
    console.log("inside validateRequestParameters()");
	console.log(params);
	if(params.dst_id && params.id_token) {
        return successResponse;
	} else {
		return errorUtility.buildErrorResponse("inv_prm");
	}
}

module.exports = function(req, res) {
    console.log("--- inside support_data_handler");
    console.log(req.body);
	if (req.body) {
		res.json(validateRequestParameters(req.body));
	} else {
		res.json(errorUtility.buildErrorResponse("inv_prm"));
	}
};
