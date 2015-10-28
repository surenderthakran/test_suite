"use strict";

var errorUtility = require("../../utils/errorUtility.js");

var successResponse = [
    {
        br_id: "broch123",
        ttl: "Brochure 1",
        img: "http://3dphy.com/images/logo.png",
        desc: "Brochure 1 Description"
	},
	{
        br_id: "broch124",
        ttl: "Brochure 2",
        img: "http://3dphy.com/images/logo.png",
        desc: "Brochure 2 Description"
	}
];

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
    console.log("--- inside brochure_list_handler");
    console.log(req.body);
	if (req.body) {
		res.json(validateRequestParameters(req.body));
	} else {
		res.json(errorUtility.buildErrorResponse("inv_prm"));
	}
};
