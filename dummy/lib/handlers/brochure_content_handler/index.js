"use strict";

module.exports = function(req, res) {
    console.log("--- inside brochure_content_handler");
    console.log(req.body);
  	res.json(brochureContent);
}

var brochureContent = [
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
