import X2JS from 'x2js'

const x2js = new X2JS();

const getCoursesForCode = (code) => {
    
}
fetch('https://courses.students.ubc.ca/cs/servlets/SRVCourseSchedule?&sessyr=2017&sesscd=W&req=4&dept=APBI&course=200&output=3')
    .then(response => response.text())
    .then(text => x2js.xml2js(text))
    .then(json => console.log(json))