"use strict";

var errorUtility = require("../../utils/errorUtility.js");

var successResponse = [
	{
	    ast_id: "ast1",
	    ttl: "M3M Polo Suites",
	    img: "http://www.m3mpolosuite.com/images/g3.jpg",
	    is_pub: true,
        addr: {
			adr_ln : "M3M Polo Suites",
			area : "Golf Course Road (Extn.), Sector 65",
			city : "Gurgaon",
			state : "Haryana",
			pin : "122002",
			cntry : "India"
		},
        location: {
            lat: 28.4006,
		    lng: 77.071
        }
	},
	{
	    ast_id: "ast2",
	    ttl: "M3M Merlin",
	    img: "http://www.m3mmerlin.com/images/gallery/large/2.jpg",
	    is_pub: false,
        addr: {
			adr_ln : "M3M Merlin",
			area : "Sector 67",
			city : "Gurgaon",
			state : "Haryana",
			pin : "122002",
			cntry : "India"
		},
        location: {
            lat: 28.39,
		    lng: 77.060
        }
	},
	{
	    ast_id: "ast3",
	    ttl: "Ireo Victory Valley",
	    img: "http://www.ireoworld.com/victoryvalley/images/home/ireo-victory-valley-flats.jpg",
	    is_pub: false,
        addr: {
			adr_ln : "Ireo Victory Valley",
			area : "Golf Course Road (Extn.), Sector 67",
			city : "Gurgaon",
			state : "Haryana",
			pin : "122001",
			cntry : "India"
		},
        location: {
            lat: 28.391,
		    lng: 77.064
        }
	}
];

function validateRequestParameters(params) {
    console.log("inside validateRequestParameters()");
	console.log(params);
	if(params.dst_id && params.id_token) {
        if (params.location && params.location.lat && params.location.lng && params.radius) {
            return successResponse;
        } else {
            return errorUtility.buildErrorResponse("inv_prm");
        }
	} else {
		return errorUtility.buildErrorResponse("inv_prm");
	}
}

module.exports = function(req, res) {
    console.log("--- inside locate_assets_handler");
    console.log(req.body);
	if (req.body) {
		res.json(validateRequestParameters(req.body));
	} else {
		res.json(errorUtility.buildErrorResponse("inv_prm"));
	}
};
