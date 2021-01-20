function getHostName(url) {
	var match = url.match(/:\/\/(www[0-9]?\.)?(.[^/:]+)/i);
	if (match != null && match.length > 2 && typeof match[2] === "string" && match[2].length > 0) {
		return match[2];
	} else {
		return null;
	}
}

var key = getHostName(location.href);
var keyJs = key + "-js";
var keyCss = key + "-css";

chrome.storage.sync.get(keyJs, function (data) {
	$(function () {
		$("<script>").attr("type", "text/javascript").text(data[keyJs]).appendTo("head");
	});
});
chrome.storage.sync.get(keyCss, function (data) {
	$("head").append('<style type="text/css">' + data[keyCss] + "</style>");
});
