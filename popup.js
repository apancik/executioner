function getHostName(url) {
	const match = url.match(/:\/\/(www[0-9]?\.)?(.[^/:]+)/i);
	if (match != null && match.length > 2 && typeof match[2] === "string" && match[2].length > 0) {
		return match[2];
	} else {
		return null;
	}
}

chrome.tabs.getSelected(null, function (tab) {
	$("#url").text(getHostName(tab.url));
});

$(() => {
	let editorJs;
	let editorCss;

	const key = $("#url").text();
	const keyJs = key + "-js";
	const keyCss = key + "-css";

	chrome.storage.sync.get(keyJs, function (data) {
		$("#js").val(data[keyJs]);

		chrome.storage.sync.get(keyCss, function (data) {
			$("#css").val(data[keyCss]);

			editorJs = CodeMirror.fromTextArea(document.getElementById("js"), {
				mode: "javascript",
			});

			editorJs.setSize("100%", 200);

			editorCss = CodeMirror.fromTextArea(document.getElementById("css"), {
				mode: "text/css",
			});

			editorCss.setSize("100%", 200);
		});
	});

	$("#button-save").click((button) => {
		editorJs.save();
		editorCss.save();

		var settings = {};
		settings[keyJs] = $("#js").val();
		settings[keyCss] = $("#css").val();

		console.log("Saving", settings);

		chrome.storage.sync.set(settings, function () {
			window.close();
		});
	});
});
