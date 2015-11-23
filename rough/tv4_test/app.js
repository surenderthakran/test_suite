'use strict';

var tv4 = require("tv4");

var schema = {
    "$schema": "http://json-schema.org/draft-04/schema#",
    "title": "distributor",
    "description": "distributor collection data model",
    "type": "object",
    "properties": {
    	"dst_id": {
    		"type": "string"
    	},
    	"slt": {
    		"type": "string"
    	},
    	"fnm": {
    		"type": "string"
    	},
    	"lnm": {
    		"type": "string"
    	},
    	"eid": {
    		"type": "email"
    	},
    	"phn": {
    		"type": "array",
    		"items": {
    			"type": "object",
    			"properties": {
    				"isd": {
    					"type": "string"
    				},
    				"num": {
    					"type": "string",
    				},
    				"type": {
    					"type": "string",
    				}
    			},
    			"required": ["isd", "num", "type"]
    		}
    	},
    	"addr": {
    		"type": "object",
    		"properties": {
    			"adr_ln": {
    				"type": "string"
    			},
    			"area": {
    				"type": "string"
    			},
    			"city": {
    				"type": "string"
    			},
    			"state": {
    				"type": "string"
    			},
    			"pin": {
    				"type": "string"
    			},
    			"cntry": {
    				"type": "string"
    			}
    		},
    		"required": ["adr_ln", "area", "city", "state", "pin", "cntry"]
    	},
    	"dob": {
    		"type": "string"
    	},
    	"crcl_ids": {
    		"type": "array",
    		"items": {
    			"type": "string"
    		}
    	},
    	"broch_ids": {
    		"type": "array",
    		"items": {
    			"type": "string"
    		}
    	}
    },
    "required": ["dst_id", "slt", "fnm", "lnm", "eid", "phn", "addr", "dob", "crcl_ids", "broch_ids"]
};

var data = {
	"dst_id": "123456",
    "slt": "Mr",
    "fnm": "test",
    "lnm": "test",
    "eid": "sunnysinghthakran@gmail.com",
    "phn": [
        {
            "isd": "+91",
            "num": "9876543210",
            "type": "work"
        },
        {
            "isd": "+91",
            "num": "9876543210",
            "type": "work"
        }
    ],
    "addr": {
        "adr_ln": "address line",
        "area": "test",
        "city": "city",
        "state": "state",
        "pin": "122001",
        "cntry": "India"
    },
    "dob": "15-08-1947",
    "crcl_ids": ["123", "456"],
    "broch_ids": ["123", "456"]
};

var valid = tv4.validate(data, schema);

console.log(valid);
console.log(tv4.error);