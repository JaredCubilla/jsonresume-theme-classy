var fs = require('fs');
var _ = require('lodash')
var Mustache = require('mustache');
var schema = require('resume-schema');

var d = new Date();
var curyear = d.getFullYear();

var resumeObject = schema.resumeJson; 

function render(resumeObject) {

resumeObject.bio.capitalName = (resumeObject.bio.firstName + ' ' + resumeObject.bio.lastName).toUpperCase();

	if (resumeObject.bio.email) {
		if (resumeObject.bio.email.personal || resumeObject.bio.email.work) {
			resumeObject.emailBool = true;
			if (resumeObject.bio.email.personal) {
				resumeObject.bio.email.email = resumeObject.bio.email.personal;
			} else if (resumeObject.bio.email.work) {
				resumeObject.bio.email.email = resumeObject.bio.email.work;
			}
		}
	}

	if (resumeObject.bio.phone) {
		if (resumeObject.bio.phone.personal || resumeObject.bio.phone.work) {
			resumeObject.phoneBool = true;
			if (resumeObject.bio.phone.personal) {
				resumeObject.bio.phone.phone = resumeObject.bio.phone.personal;
			} else if (resumeObject.bio.phone.work) {
				resumeObject.bio.phone.phone = resumeObject.bio.phone.work;
			}
		}
	}

	if (resumeObject.bio.profiles) {
		if (resumeObject.bio.profiles.twitter) {
			resumeObject.twitterBool = true;
		}

		if (resumeObject.bio.profiles.linkedin) {
			resumeObject.linkedinBool = true;
		}

		if (resumeObject.bio.profiles.pinterest) {
			resumeObject.pinterestBool = true;
		}

		if (resumeObject.bio.profiles.github) {
			resumeObject.githubBool = true;
		}
	}

	if (resumeObject.bio.websites) {
		if (resumeObject.bio.websites.blog) {
			resumeObject.blogBool = true;
		}
	}

	if (resumeObject.bio.summary) {
		resumeObject.aboutBool = true;
	}

	if (resumeObject.work) {
		if (resumeObject.work[0].company) {
			resumeObject.workBool = true;
			_.each(resumeObject.work, function(w){
				w.startDateYear = (w.startDate || "").substr(0,4);
				if(w.endDate) {
					w.endDateYear = (w.endDate || "").substr(0,4);
				} else { 
					w.endDateYear = 'Present'
				}
			});
			_.each(resumeObject.work, function(w){
				if (w.highlights) {
					if (w.highlights[0]) {
						if (w.highlights[0] != "") {
							w.workHighlights = true;
						}
					}
				}
			});
		}
	}

	if (resumeObject.education) {
		if (resumeObject.education[0].institution) {
			resumeObject.educationBool = true;
			_.each(resumeObject.education, function(e){
			    if( !e.area || !e.studyType ){
			      e.educationDetail = (e.area == null ? '' : e.area) + (e.studyType == null ? '' : e.studyType);
			    } else {
			      e.educationDetail = e.area + ", "+ e.studyType;
			    }
				e.startDateYear = e.startDate.substr(0,4);
				if (e.endDate) {
					e.endDateYear = e.endDate.substr(0,4);
					if (e.endDateYear > curyear) {
						e.endDateYear += " (expected)";
					}
				} else { 
					e.endDateYear = 'Present'
				}
			});
		}
	}

	if (resumeObject.awards) {
		if (resumeObject.awards[0].title) {
			resumeObject.awardsBool = true;
			_.each(resumeObject.awards, function(a){
				a.year = (a.date || "").substr(0,4);
				a.day = (a.date || "").substr(8,2);
				switch ((a.date || "").substr(5,2)) {
					case '01':
						a.month = "January";
						break;
					case '02':
						a.month = "February";
						break;
					case '03':
						a.month = "March";
						break;
					case '04':
						a.month = "April";
						break;
					case '05':
						a.month = "May";
						break;
					case '06':
						a.month = "June";
						break;
					case '07':
						a.month = "July";
						break;
					case '08':
						a.month = "August";
						break;
					case '09':
						a.month = "September";
						break;
					case '10': 
						a.month = "October";
						break;
					case '11':
						a.month = "November";
						break;
					case '12':
						a.month = "December";
						break;
				}
			});
		}
	}

	if (resumeObject.publications) {
		if (resumeObject.publications[0].name) {
			resumeObject.publicationsBool = true;
			_.each(resumeObject.publications, function(a){
				a.year = (a.releaseDate || "").substr(0,4);
				a.day = (a.releaseDate || "").substr(8,2);
				switch ((a.releaseDate || "").substr(5,2)) {
					case '01':
						a.month = "January";
						break;
					case '02':
						a.month = "February";
						break;
					case '03':
						a.month = "March";
						break;
					case '04':
						a.month = "April";
						break;
					case '05':
						a.month = "May";
						break;
					case '06':
						a.month = "June";
						break;
					case '07':
						a.month = "July";
						break;
					case '08':
						a.month = "August";
						break;
					case '09':
						a.month = "September";
						break;
					case '10': 
						a.month = "October";
						break;
					case '11':
						a.month = "November";
						break;
					case '12':
						a.month = "December";
						break;
				}
			});
		}
	}

	if (resumeObject.skills) {
		if (resumeObject.skills[0].name) {
			resumeObject.skillsBool = true;
		}
	}

	if (resumeObject.references) {
		if (resumeObject.references[0].name) {
			resumeObject.referencesBool = true;
		}
	}

	var theme = fs.readFileSync(__dirname + '/resume.template', 'utf8');
	var resumeHTML = Mustache.render(theme, resumeObject);
	

	return resumeHTML;
};
module.exports = {
	render: render
}