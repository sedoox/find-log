const fs = require("fs");
const XRegExp = require("xregexp");

const file = "./example.java";
const reg_pattern_log = new RegExp('(?<=log\\.info\\(")(.*?)(?=")', "g");

fs.readFile(file, "utf8", (err, data) => {
	if (err) throw err;

	const matches_logs = data.match(reg_pattern_log);
	const matches_functions = XRegExp.matchRecursive(data, "\\(", "\\)", "g");
	var arr_index = [];

	matches_functions.forEach((fun) => {
		if (fun != "") {
			arr_index.push(data.indexOf(fun));
		}
	});

	arr_index.sort((a, b) => a - b);

	matches_logs.forEach((log) => {
		const indexOfLog = data.indexOf(log);
		var num = 0;

		arr_index.forEach((index) => {
			if (index < indexOfLog - 1) {
				num = index;
			}
		});
		console.log(
			data.substring(indexOfLog, indexOfLog + log.length) +
				" -> " +
				data.substring(num, num + 10)
		);
	});
});
