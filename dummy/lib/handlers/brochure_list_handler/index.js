"use strict";

var errorUtility = require("../../utils/errorUtility.js");

var successResponse = [
    {
        broch_id: "broch123",
        ttl: "Golf Course Road",
        img: "http://www.m3mpolosuite.com/images/g3.jpg",
        desc: "Properties on Golf Course Road"
	},
	{
        broch_id: "broch124",
        ttl: "Sector 67",
        img: "http://www.m3mmerlin.com/images/gallery/large/2.jpg",
        desc: "Properties in Sector 67"
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
