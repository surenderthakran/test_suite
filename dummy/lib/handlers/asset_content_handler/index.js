"use strict";

var errorUtility = require("../../utils/errorUtility.js");

var successResponse = {
    ast_id: "ast123",
    ttl: "M3M Polo Suites",
    img: "http://www.m3mpolosuite.com/images/g3.jpg",
    info: {
        addr: {
			adr_ln : "M3M Polo Suites",
			area : "Golf Course Road (Extn.), Sector 65",
			city : "Gurgaon",
			state : "Haryana",
			pin : "122002",
			cntry : "India"
		},
        types: ["3bhk", "4bhk"],
        price_range: [61700000.00, 77400000.00],
        sizes: [173370000.00, 217580000.00],
        launch_date: "06-01-2011",
        possession_date: "09-01-2016",
        project_area: {
            area: 16.00,
            unit: "acre"
		},
		no_of_units: 184
	},
	vr_url: "http://openspace.3dphy.com/?un=sa&ic=TulipIvory&md=t",
	imgs: [
    	{
	        img: "http://www.m3mpolosuite.com/images/g1.jpg",
	        ttl: "Project Image 1"
		},
		{
	        img: "http://www.m3mpolosuite.com/images/g2.jpg",
	        ttl: "Project Image 2"
		},
		{
	        img: "http://www.m3mpolosuite.com/images/g3.jpg",
	        ttl: "Project Image 3"
		},
		{
	        img: "http://www.m3mpolosuite.com/images/g4.jpg",
	        ttl: "Project Image 4"
		}
	],
	floor_plans: [
	    {
	        img: "http://www.m3mpolosuite.com/images/fp-01.jpg",
	        ttl: "Floor Plan 1"
		},
		{
	        img: "http://www.m3mpolosuite.com/images/fp-02.jpg",
	        ttl: "Floor Plan 2"
		},
		{
	        img: "http://www.m3mpolosuite.com/images/fp-03.jpg",
	        ttl: "Floor Plan 3"
		},
		{
	        img: "http://www.m3mpolosuite.com/images/fp-04.jpg",
	        ttl: "Floor Plan 4"
		}
	],
	map: {
	    lat: 28.4006,
	    lng: 77.071
	},
	vid: [
		{
		    url: "https://youtu.be/OIA8CrfQ5Xc",
		    ttl: "Video 1"
		},
		{
		    url: "https://www.youtube.com/watch?v=piH5_aP0fY8",
		    ttl: "Video 2"
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
