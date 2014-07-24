var fs = require('fs');
var gravatar = require('gravatar');
var _ = require('lodash')
var Mustache = require('mustache');

function render(resumeObject) {


	_.each(resumeObject.work, function(w){
		w.startDateYear = w.startDate.substr(0,4);
		if(w.endDate) {
			w.endDateYear = w.endDate.substr(0,4);
		} else { 
			w.endDateYear = 'Present'
		}
	});
	_.each(resumeObject.education, function(e){
    if( !e.area || !e.studyType ){
      e.educationDetail = (e.area == null ? '' : e.area) + (e.studyType == null ? '' : e.studyType);
    }  else {
      e.educationDetail = e.area + ", "+ e.studyType;
    }
		e.startDateYear = e.startDate.substr(0,4);
		if(e.endDate) {
			e.endDateYear = e.endDate.substr(0,4);
		}  else { 
			e.endDateYear = 'Present'
		}
	});
	if(resumeObject.bio && resumeObject.bio.email && resumeObject.bio.email.personal) {
		resumeObject.bio.gravatar = gravatar.url(resumeObject.bio.email.personal, {
                        s: '100',
                        r: 'pg',
                        d: 'mm'
                    });
	}

	var theme = fs.readFileSync(__dirname + '/resume.template', 'utf8');
	var resumeHTML = Mustache.render(theme, resumeObject);
	

	return resumeHTML;
};
module.exports = {
	render: render
}
