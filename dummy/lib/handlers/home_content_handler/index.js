"use strict";

var errorUtility = require("../../utils/errorUtility.js");

var successResponse = {
    cities: [
        {
            ct_id: "ct123",
            nm: "Delhi",
            is_sel: true
		},
		{
            ct_id: "ct124",
            nm: "Mumbai"
		}
	],
	top_ast: [
    	{
	        ast_id: "ast123",
	        img: "http://3dphy.com/images/logo.png",
            ttl: "Asset 1",
            types: ["2bhk", "4bhk"],
            price_range: [2575000.00, 8590000.00]
		},
		{
	        ast_id: "ast124",
	        img: "http://3dphy.com/images/logo.png",
            ttl: "Asset 2",
            types: ["2bhk", "4bhk"],
            price_range: [2575000.00, 8590000.00]
		},
		{
	        ast_id: "ast125",
	        img: "http://3dphy.com/images/logo.png",
            ttl: "Asset 3",
            types: ["2bhk", "4bhk"],
            price_range: [2575000.00, 8590000.00]
		}
	],
	cats: [
	    {
	        cat_id: "cat123",
	        img: "http://3dphy.com/images/logo.png"
		},
		{
	        cat_id: "cat124",
	        img: "http://3dphy.com/images/logo.png"
		},
		{
	        cat_id: "cat125",
	        img: "http://3dphy.com/images/logo.png"
		}
	]
};

function validateRequestParameters(params) {
    console.log("inside validateRequestParameters()");
	console.log(params);
	if(params.dst_id && params.id_token) {
        if (params.ct_id || (params.location && params.location.lat && params.location.lng && params.accuracy)) {
            return successResponse;
        } else {
            return errorUtility.buildErrorResponse("inv_prm");
        }
	} else {
		return errorUtility.buildErrorResponse("inv_prm");
	}
}

module.exports = function(req, res) {
    console.log("--- inside home_content_handler");
    console.log(req.body);
	if (req.body) {
		res.json(validateRequestParameters(req.body));
	} else {
		res.json(errorUtility.buildErrorResponse("inv_prm"));
	}
};
