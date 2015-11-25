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
	        ast_id: "ast1",
	        ttl: "M3M Polo Suites",
	    	img: "http://www.m3mpolosuite.com/images/g3.jpg",
            types: ["3bhk", "4bhk"],
	        price_range: [61700000.00, 77400000.00]
		},
		{
	        ast_id: "ast2",
	        ttl: "M3M Merlin",
	    	img: "http://www.m3mmerlin.com/images/gallery/large/2.jpg",
            types: ["3bhk", "4bhk", "Penthouse"],
	        price_range: [19100000.00, 64300000.00]
		},
		{
	        ast_id: "ast3",
	        ttl: "Ireo Victory Valley",
	    	img: "http://www.ireoworld.com/victoryvalley/images/home/ireo-victory-valley-flats.jpg",
            types: ["2bhk", "3bhk", "4bhk", "Penthouse"],
	        price_range: [15400000.00, 62700000.00]
		},
		{
	        ast_id: "ast4",
	        ttl: "Ireo Gurgaon Hills",
	    	img: "http://www.ireoworld.com/Gurgaonhills/images/home/ireo-gurgaon-hills-luxury-apartments.jpg",
            types: ["3bhk", "4bhk"],
	        price_range: [42400000.00, 120300000.00]
		},
		{
	        ast_id: "ast5",
	        ttl: "Ireo Ascott Ireo City",
	    	img: "http://www.ascottireocity.com/images/home/4.jpg",
            types: ["1bhk", "2bhk", "Studio"],
	        price_range: [17300000.00, 27500000.00]
		},
		{
	        ast_id: "ast6",
	        ttl: "Ireo Skyon",
	    	img: "http://www.ireoworld.com/skyon/images/gallery/10.jpg",
            types: ["2bhk", "3bhk", "4bhk"],
	        price_range: [17500000.00, 39700000.00]
		},
		{
	        ast_id: "ast7",
	        ttl: "M3M Woodshire",
	    	img: "http://m3mwoodshire.co/images/gallery/large/7.jpg",
            types: ["2bhk", "3bhk", "4bhk"],
	        price_range: [9971000.00, 17800000.00]
		},
		{
	        ast_id: "ast8",
	        ttl: "M3M Golf Estate",
	    	img: "http://www.m3mgolfestate.com/images/gallery/large/1.jpg",
            types: ["3bhk", "4bhk", "Penthouse"],
	        price_range: [49800000.00, 80200000.00]
		},
		{
	        ast_id: "ast9",
	        ttl: "Amrapali Silicon City",
	    	img: "http://www.amrapali.in/images/Silicon-gl-bg1.jpg",
            types: ["1bhk", "2bhk", "3bhk", "4bhk"],
	        price_range: [5225000.00, 13300000.00]
		},
		{
	        ast_id: "ast10",
	        ttl: "Amrapali Golf Homes",
	    	img: "http://www.amrapali.in/images/golfhomes-gl-big1.jpg",
            types: ["2bhk", "3bhk"],
	        price_range: [2790000.00, 5330000.00]
		},
		{
	        ast_id: "ast11",
	        ttl: "Amrapali Sapphire",
	    	img: "http://www.amrapali.in/images/Sapphire-Exterior-View-1.jpg",
            types: ["2bhk", "3bhk", "4bhk"],
	        price_range: [7180000.00, 19000000.00]
		},
		{
	        ast_id: "ast12",
	        ttl: "Amrapali Platinum",
	    	img: "http://www.amrapali.in/images/platinum-gl-big1.jpg",
            types: ["3bhk", "4bhk", "Penthouse", "Villa"],
	        price_range: [6526000.00, 13200000.00]
		},
		{
	        ast_id: "ast13",
	        ttl: "Assotech Breeze",
	    	img: "http://www.assotechlimited.com/images/tpic-assotech-breeze.jpg",
            types: ["2bhk", "3bhk"],
	        price_range: [9330000.00, 14600000.00]
		},
		{
	        ast_id: "ast14",
	        ttl: "Assotech Blith",
	    	img: "http://www.assotechblith.co.in/images/main-banner2.jpg",
            types: ["2bhk", "3bhk", "4bhk"],
	        price_range: [16000000.00, 19400000.00]
		},
		{
	        ast_id: "ast15",
	        ttl: "Assotech Celeste Tower",
	    	img: "http://www.assotechlimited.com/images/tpic-celeste-tower.jpg",
            types: ["3bhk", "4bhk"],
	        price_range: [16000000.00, 19400000.00]
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
