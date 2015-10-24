"use strict";

(function() {
	var url = "/v0/data/brochure_content";
	var data = {
		mno: "+919650627508"
	}
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