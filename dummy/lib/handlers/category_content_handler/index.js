"use strict";

var errorUtility = require("../../utils/errorUtility.js");

var successResponse = [
	{
	    ast_id: "ast1",
        ttl: "M3M Polo Suites",
    	img: "http://www.m3mpolosuite.com/images/g3.jpg",
	    is_pub: true
	},
	{
	    ast_id: "ast2",
        ttl: "M3M Merlin",
    	img: "http://www.m3mmerlin.com/images/gallery/large/2.jpg",
	    is_pub: false
	}
];

function validateRequestParameters(params) {
    console.log("inside validateRequestParameters()");
	console.log(params);
	if(params.dst_id && params.id_token) {
        if (params.ct_id && params.cat_id) {
            return successResponse;
        } else {
            return errorUtility.buildErrorResponse("inv_prm");
        }
	} else {
		return errorUtility.buildErrorResponse("inv_prm");
	}
}

module.exports = function(req, res) {
    console.log("--- inside category_content_handler");
    console.log(req.body);
	if (req.body) {
		res.json(validateRequestParameters(req.body));
	} else {
		res.json(errorUtility.buildErrorResponse("inv_prm"));
	}
};
