import X2JS from 'x2js'
import { baseURL, and, year, term, req4, req3, dept, course, output } from './constants.js'

const x2js = new X2JS();

const getCoursesForCode = (code) => {
    //fetch(c.baseURL + c.year + c.term + c.req4 + c.dept('APBI') + c.course(200) + c.output)
    fetch(baseURL + and + year + and + term + and + req4 + and + dept('APBI') + and + course(200) + and + output)
        .then(response => response.text())
        .then(text => x2js.xml2js(text))
        .then(json => console.log(json))
}

export default getCoursesForCode
//'https://courses.students.ubc.ca/cs/servlets/SRVCourseSchedule?&sessyr=2017&sesscd=W&req=4&dept=APBI&course=200&output=3'