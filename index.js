var fs = require('fs');
var path = require('path');
var _ = require('lodash');
var Handlebars = require('handlebars');
var schema = require('resume-schema');
var dateFormat = require('dateformat');

var resumeObject = schema.resumeJson;

function render(resumeObject) {

	var css = fs.readFileSync(__dirname + "/style.css", "utf-8");
	var tpl = fs.readFileSync(__dirname + "/resume.hbs", "utf-8");
	var partialsDir = path.join(__dirname, 'partials');
	var filenames = fs.readdirSync(partialsDir);

	if (resumeObject.basics.profiles) {
		if (resumeObject.basics.profiles[0].network) {
			_.each(resumeObject.basics.profiles, function (w) {
				w.network = w.network.toLowerCase();
				if ((w.network == 'twitter') && w.url == '' && w.username != '') {
					w.url = "https://twitter.com/" + w.username;
				}
				if ((w.network == 'facebook') && w.url == '' && w.username != '') {
					w.url = "https://facebook.com/" + w.username;
				}
				if ((w.network == 'linkedin') && w.url == '' && w.username != '') {
					w.url = "https://linkedin.com/in/" + w.username;
				}
				if ((w.network == 'github') && w.url == '' && w.username != '') {
					w.url = "https://github.com/" + w.username;
				}
			});
		}
	}

	if (resumeObject.work) {
		if (resumeObject.work[0].company) {
			_.each(resumeObject.work, function (w) {
				if (w.startDate) {
					w.startDate = dateFormat(new Date(w.startDate), "yyyy-mmm");
				}
				if (w.endDate) {
					w.endDate = dateFormat(new Date(w.endDate), "yyyy-mmm");
				}
			});
		}
	}

	if (resumeObject.education) {
		if (resumeObject.education[0].institution) {
			_.each(resumeObject.education, function (e) {
				if (e.startDate) {
					e.startDate = dateFormat(new Date(e.startDate), "yyyy-mmm");
				}
				if (e.endDate) {
					e.endDate = dateFormat(new Date(e.endDate), "yyyy-mmm");
				}
			});
		}
	}

	if (resumeObject.awards) {
		if (resumeObject.awards[0].title) {
			resumeObject.awardsBool = true;
			_.each(resumeObject.awards, function (a) {
				if(a.date)
				a.date = dateFormat(new Date(a.date), "yyyy-mmm");
			});
		}
	}

	if (resumeObject.publications) {
		if (resumeObject.publications[0].name) {
			_.each(resumeObject.publications, function (a) {
				if(a.date)
				a.date = dateFormat(new Date(a.date), "yyyy-mmm");
			});
		}
	}

	if (resumeObject.volunteer) {
		if (resumeObject.volunteer[0].position) {
			_.each(resumeObject.volunteer, function (v) {
				if (v.startDate) {
					v.startDate = dateFormat(new Date(v.startDate), "yyyy-mmm");
				}
				if (v.endDate) {
					v.endDate = dateFormat(new Date(v.endDate), "yyyy-mmm");
				}
			});
		}
	}

	filenames.forEach(function (filename) {
		var matches = /^([^.]+).hbs$/.exec(filename);
		if (!matches) {
			return;
		}
		var name = matches[1];
		var filepath = path.join(partialsDir, filename)
		var template = fs.readFileSync(filepath, 'utf8');

		Handlebars.registerPartial(name, template);
	});
	return Handlebars.compile(tpl)({
		css: css,
		resume: resumeObject
	});
};

module.exports = {
	render: render
}