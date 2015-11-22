"use strict";

var errorUtility = require("../../utils/errorUtility.js");

var successResponse = [
	{
	    ast_id: "ast123",
	    ttl: "Asset 1",
	    img: "http://3dphy.com/images/logo.png",
	    is_pub: true
	},
	{
	    ast_id: "ast124",
	    ttl: "Asset 2",
	    img: "http://3dphy.com/images/logo.png",
	    is_pub: false
	},
	{
	    ast_id: "ast125",
	    ttl: "Asset 3",
	    img: "http://3dphy.com/images/logo.png",
	    is_pub: false
	}
];

function validateRequestParameters(params) {
    console.log("inside validateRequestParameters()");
	console.log(params);
	if(params.dst_id && params.id_token) {
        if (params.broch_id) {
            return successResponse;
        } else {
            return errorUtility.buildErrorResponse("inv_prm");
        }
	} else {
		return errorUtility.buildErrorResponse("inv_prm");
	}
}

module.exports = function(req, res) {
    console.log("--- inside brochure_content_handler");
    console.log(req.body);
	if (req.body) {
		res.json(validateRequestParameters(req.body));
	} else {
		res.json(errorUtility.buildErrorResponse("inv_prm"));
	}
};
