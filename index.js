var fs = require('fs');
var _ = require('lodash');
var Mustache = require('mustache');
var schema = require('resume-schema');

var d = new Date();
var curyear = d.getFullYear();

var resumeObject = schema.resumeJson; 

function render(resumeObject) {

resumeObject.basics.capitalName = (resumeObject.basics.name).toUpperCase();
resumeObject.basics.capitalLabel = (resumeObject.basics.label).toUpperCase();

	if (resumeObject.basics.email) {
		resumeObject.emailBool = true;
	}

	if (resumeObject.basics.phone) {
		resumeObject.phoneBool = true;
	}

	if (resumeObject.basics.picture) {
		resumeObject.pictureBool = true;
	}

	if (resumeObject.basics.website) {
		resumeObject.websiteBool = true;
	}

	if (resumeObject.basics.summary) {
		resumeObject.aboutBool = true;
	}

	if (resumeObject.basics.profiles) {
		if (resumeObject.basics.profiles[0].network) {
			_.each(resumeObject.basics.profiles, function(w){
				if ((w.network == 'Twitter' || w.network == 'twitter') && w.url == '' && w.username != '') {
					w.url = "https://twitter.com/" + w.username;
				}
				if ((w.network == 'facebook' || w.network == 'Facebook' || w.network == 'FaceBook') && w.url == '' && w.username != '') {
					w.url = "https://facebook.com/" + w.username;
				}
				if ((w.network == 'Linkedin' || w.network == 'linkedin' || w.network == 'LinkedIn') && w.url == '' && w.username != '') {
					w.url = "https://linkedin.com/in/" + w.username;
				}
			});
		}
	}

	if (resumeObject.work) {
		if (resumeObject.work[0].company) {
			resumeObject.workBool = true;
			_.each(resumeObject.work, function(w){
				if (w.startDate) {
					w.startDateYear = (w.startDate || "").substr(0,4);
					switch (w.startDate.substr(5,2)) {
						case '01':
							w.startDateMonth = "January ";
							break;
						case '02':
							w.startDateMonth = "February ";
							break;
						case '03':
							w.startDateMonth = "March ";
							break;
						case '04':
							w.startDateMonth = "April ";
							break;
						case '05':
							w.startDateMonth = "May ";
							break;
						case '06':
							w.startDateMonth = "June ";
							break;
						case '07':
							w.startDateMonth = "July ";
							break;
						case '08':
							w.startDateMonth = "August ";
							break;
						case '09':
							w.startDateMonth = "September ";
							break;
						case '10': 
							w.startDateMonth = "October ";
							break;
						case '11':
							w.startDateMonth = "November ";
							break;
						case '12':
							w.startDateMonth = "December ";
							break;
						}
				}
				if(w.endDate) {
					w.endDateYear = (w.endDate || "").substr(0,4);
					switch ((w.endDate || "").substr(5,2)) {
						case '01':
							w.endDateMonth = "January ";
							break;
						case '02':
							w.endDateMonth = "February ";
							break;
						case '03':
							w.endDateMonth = "March ";
							break;
						case '04':
							w.endDateMonth = "April ";
							break;
						case '05':
							w.endDateMonth = "May ";
							break;
						case '06':
							w.endDateMonth = "June ";
							break;
						case '07':
							w.endDateMonth = "July ";
							break;
						case '08':
							w.endDateMonth = "August ";
							break;
						case '09':
							w.endDateMonth = "September ";
							break;
						case '10': 
							w.endDateMonth = "October ";
							break;
						case '11':
							w.endDateMonth = "November ";
							break;
						case '12':
							w.endDateMonth = "December ";
							break;
						}
				} else { 
					w.endDateYear = 'Present'
				}
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
			    if (e.gpa) {
			    	e.gpaBool = true;
			    }
				if (e.startDate) {
					e.startDateYear = e.startDate.substr(0,4);
					switch (e.startDate.substr(5,2)) {
						case '01':
							e.startDateMonth = "January ";
							break;
						case '02':
							e.startDateMonth = "February ";
							break;
						case '03':
							e.startDateMonth = "March ";
							break;
						case '04':
							e.startDateMonth = "April ";
							break;
						case '05':
							e.startDateMonth = "May ";
							break;
						case '06':
							e.startDateMonth = "June ";
							break;
						case '07':
							e.startDateMonth = "July ";
							break;
						case '08':
							e.startDateMonth = "August ";
							break;
						case '09':
							e.startDateMonth = "September ";
							break;
						case '10': 
							e.startDateMonth = "October ";
							break;
						case '11':
							e.startDateMonth = "November ";
							break;
						case '12':
							e.startDateMonth = "December ";
							break;
					}
				} else {
					e.endDateMonth = "";
				}
				if (e.endDate) {
					e.endDateYear = e.endDate.substr(0,4);
					switch (e.endDate.substr(5,2)) {
						case '01':
							e.endDateMonth = "January ";
							break;
						case '02':
							e.endDateMonth = "February ";
							break;
						case '03':
							e.endDateMonth = "March ";
							break;
						case '04':
							e.endDateMonth = "April ";
							break;
						case '05':
							e.endDateMonth = "May ";
							break;
						case '06':
							e.endDateMonth = "June ";
							break;
						case '07':
							e.endDateMonth = "July ";
							break;
						case '08':
							e.endDateMonth = "August ";
							break;
						case '09':
							e.endDateMonth = "September ";
							break;
						case '10': 
							e.endDateMonth = "October ";
							break;
						case '11':
							e.endDateMonth = "November ";
							break;
						case '12':
							e.endDateMonth = "December ";
							break;
					}
					if (e.endDateYear > curyear) {
						e.endDateYear += " (expected)";
					}
				} else { 
					e.endDateYear = 'Present'
					e.endDateMonth = '';
				}
				if (e.courses) {
					if (e.courses[0]) {
						if (e.courses[0] != "") {
							e.educationCourses = true;
						}
					}
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

	if (resumeObject.volunteer) {
		if (resumeObject.volunteer[0].position) {
			resumeObject.volunteerBool = true;
			_.each(resumeObject.volunteer, function(a){
				a.startDateYear = (a.startDate || "").substr(0,4);
				switch ((a.startDate || "").substr(5,2)) {
					case '01':
						a.startDateMonth = "January ";
						break;
					case '02':
						a.startDateMonth = "February ";
						break;
					case '03':
						a.startDateMonth = "March ";
						break;
					case '04':
						a.startDateMonth = "April ";
						break;
					case '05':
						a.startDateMonth = "May ";
						break;
					case '06':
						a.startDateMonth = "June ";
						break;
					case '07':
						a.startDateMonth = "July ";
						break;
					case '08':
						a.startDateMonth = "August ";
						break;
					case '09':
						a.startDateMonth = "September ";
						break;
					case '10': 
						a.startDateMonth = "October ";
						break;
					case '11':
						a.startDateMonth = "November ";
						break;
					case '12':
						a.startDateMonth = "December ";
						break;
				}
				a.endDateYear = (a.endDate || "").substr(0,4);
				switch ((a.endDate || "").substr(5,2)) {
					case '01':
						a.endDateMonth = "January ";
						break;
					case '02':
						a.endDateMonth = "February ";
						break;
					case '03':
						a.endDateMonth = "March ";
						break;
					case '04':
						a.endDateMonth = "April ";
						break;
					case '05':
						a.endDateMonth = "May ";
						break;
					case '06':
						a.endDateMonth = "June ";
						break;
					case '07':
						a.endDateMonth = "July ";
						break;
					case '08':
						a.endDateMonth = "August ";
						break;
					case '09':
						a.endDateMonth = "September ";
						break;
					case '10': 
						a.endDateMonth = "October ";
						break;
					case '11':
						a.endDateMonth = "November ";
						break;
					case '12':
						a.endDateMonth = "December ";
						break;
				}
				if (a.highlights) {
					if (a.highlights[0]) {
						if (a.highlights[0] != "") {
							a.volunterHighlights = true;
						}
					}
				}
			});
		}
	}

	if (resumeObject.skills) {
		if (resumeObject.skills[0].name) {
			resumeObject.skillsBool = true;
		}
	}

	if (resumeObject.interests) {
		if (resumeObject.interests[0].name) {
			resumeObject.interestsBool = true;
		}
	}

	if (resumeObject.languages) {
		if (resumeObject.languages[0].language) {
			resumeObject.languagesBool = true;
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