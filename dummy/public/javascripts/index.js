"use strict";

(function() {
	var url = "/v0/data/locate_assets";
	var data = {
	    dst_id: "abc123",
	    id_token: "6c84fb90-12c4-11e1-840d-7b25c5ee775a",
		location: {
			lat: 65.33,
			lng: 65.33
		},
		radius: 3.4
	};

	$( document ).ready(function() {
		console.log("ready");
		$.ajax({
			type: "POST",
			url: url,
			data: data,
			success: function(result) {
				console.log("success");
				console.log($("#result"));
				$("#url").text(url);
				$("#param").text(JSON.stringify(data));
				$("#result").text(JSON.stringify(result));
			},
			dataType: "json"
		});
	});
})();
