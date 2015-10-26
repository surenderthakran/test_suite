"use strict";

var otpAuth = {
    sts: 1,
    slt: "Mr",
    dst_id: "abc123",
    fnm: "First",
    lnm: "Last",
    eid: "test@test.com",
    dob: "15-08-1947"
};

module.exports = function(req, res) {
    console.log("--- inside otp_auth_handler");
    console.log(req.body);
    res.json(otpAuth);
};
