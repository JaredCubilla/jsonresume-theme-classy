var http = require("http");
var resume = require("resume-schema").resumeJson;
var theme = require("./index.js");
var fs = require('fs');
const spawn = require('child_process').spawn;

var port = 8080;
http.createServer(function(req, res) {
	res.writeHead(200, {"Content-Type": "text/html"});
	res.end(render());
}).listen(port);

console.log("Serving theme");
console.log("Preview: http://localhost:8080/");
spawn('open', ['http://localhost:8080/']);

function render() {
	try {
		var private_resume = JSON.parse(fs.readFileSync("../json-resume/resume.json", "utf-8"));
		return theme.render(private_resume);
	} catch(e) {
		console.log("Error: " + e.message);
		return "";
	}
}