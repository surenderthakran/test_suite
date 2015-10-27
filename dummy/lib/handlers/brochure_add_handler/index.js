"use strict";

var brochureAdd = {
	sts: 1
};

module.exports = function(req, res) {
    console.log("--- inside brochure_add_handler");
    console.log(req.body);
  	res.json(brochureAdd);
}
