"use strict";

module.exports = function(req, res) {
    console.log("--- inside brochure_list_handler");
    console.log(req.body);
  	res.json(brochureList);
}

var brochureList = [
    {
        br_id: "broch123",
        ttl: "Brochure 1",
        img: "http://3dphy.com/images/logo.png"
	},
	{
        br_id: "broch124",
        ttl: "Brochure 2",
        img: "http://3dphy.com/images/logo.png"
	}
];
