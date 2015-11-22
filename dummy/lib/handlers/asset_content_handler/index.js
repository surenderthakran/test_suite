"use strict";

var errorUtility = require("../../utils/errorUtility.js");

var successResponse = {
    ast_id: "ast123",
    ttl: "Asset 1",
    img: "http://3dphy.com/images/logo.png",
    info: {
        addr: {
			adr_ln : "address line",
			area : "test area`",
			city : "test city",
			state : "test state",
			pin : "test pin",
			cntry : "India"
		},
        types: ["2bhk", "4bhk"],
        price_range: [2575000.00, 8590000.00],
        sizes: [800.00, 3000.00],
        launch_date: "01-11-2015",
        possession_date: "10-04-2017",
        project_area: {
            area: 45000.00,
            unit: "sqft"
		},
		no_of_units: 84
	},
	vr_url: "https://www.google.com/url?q=http://openspace.3dphy.com/?un%3Dsa%26ic%3DTulipIvory%26md%3Dt&sa=D&ust=1445595725953000&usg=AFQjCNFvlgbGcAcsxtH3U2RrBn0pfKWsJw",
	imgs: [
    	{
	        img: "http://3dphy.com/images/logo.png",
	        ttl: "Room 1"
		},
		{
	        img: "http://3dphy.com/images/logo.png",
	        ttl: "Room 2"
		},
		{
	        img: "http://3dphy.com/images/logo.png",
	        ttl: "Room 3"
		}
	],
	floor_plans: [
	    {
	        img: "http://3dphy.com/images/logo.png",
	        ttl: "Plan 1"
		},
		{
	        img: "http://3dphy.com/images/logo.png",
	        ttl: "Plan 2"
		}
	],
	map: {
	    lat: 28.419728,
	    lng: 77.042134
	},
	vid: [
		{
		    url: "https://www.youtube.com/watch?v=piH5_aP0fY8",
		    ttl: "Video 1"
		},
		{
		    url: "https://www.youtube.com/watch?v=piH5_aP0fY8",
		    ttl: "Video 1"
		}
	]
};

function validateRequestParameters(params) {
    console.log("inside validateRequestParameters()");
	console.log(params);
	if(params.dst_id && params.id_token) {
        if (params.ast_id) {
            return successResponse;
        } else {
            return errorUtility.buildErrorResponse("inv_prm");
        }
	} else {
		return errorUtility.buildErrorResponse("inv_prm");
	}
}

module.exports = function(req, res) {
    console.log("--- inside asset_content_handler");
    console.log(req.body);
	if (req.body) {
		res.json(validateRequestParameters(req.body));
	} else {
		res.json(errorUtility.buildErrorResponse("inv_prm"));
	}
};
