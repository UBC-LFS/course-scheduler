import X2JS from 'x2js'
import * as c from './constants.js'

const x2js = new X2JS();

const getCoursesForCode = (code) => {
    //fetch(c.baseURL + c.year + c.term + c.req4 + c.dept('APBI') + c.course(200) + c.output)
    fetch(c.baseURL + c.and + c.year + c.and + c.term + c.and + c.req4 + c.and + c.dept('APBI') + c.and + c.course(200) + c.and + c.output)
        .then(response => response.text())
        .then(text => x2js.xml2js(text))
        .then(json => console.log(json))
}

export default getCoursesForCode
//'https://courses.students.ubc.ca/cs/servlets/SRVCourseSchedule?&sessyr=2017&sesscd=W&req=4&dept=APBI&course=200&output=3'