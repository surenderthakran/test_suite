"use strict";

var errorUtility = require("../../utils/errorUtility.js");

var successResponse = {
    cities: [
        {
            ct_id: "ct123",
            nm: "Gurgaon",
            is_sel: true
		}
	],
	top_ast: [
    	{
	        ast_id: "ast123",
	        img: "http://www.m3mpolosuite.com/images/g3.jpg",
            ttl: "M3M Polo Suites",
            types: ["3bhk", "4bhk"],
            price_range: [61700000.00, 77400000.00]
		},
		{
	        ast_id: "ast124",
	        img: "http://www.m3mmerlin.com/images/gallery/large/2.jpg",
            ttl: "M3M Merlin",
            types: ["3bhk", "4bhk", "Penthouse"],
            price_range: [19100000.00, 64300000.00]
		},
		{
	        ast_id: "ast125",
	        img: "http://www.ireoworld.com/victoryvalley/images/home/ireo-victory-valley-flats.jpg",
            ttl: "IREO Victory Valley",
            types: ["2bhk", "3bhk", "4bhk", "Penthouse"],
            price_range: [15400000.00, 62700000.00]
		}
	],
	cats: [
	    {
	        cat_id: "cat123",
	        img: "http://www.m3mnewprojects.co.in/assets/images/logo-m3m-india.png"
		},
		{
	        cat_id: "cat124",
	        img: "http://www.ireoworld.com/images/ireo-logo.png"
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
