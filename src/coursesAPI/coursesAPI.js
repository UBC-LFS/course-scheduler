import X2JS from 'x2js'
import { baseURL, and, year, term, req4, req3, req2, dept, course, output, departments } from './constants.js'
import APBI200 from '../sampleJSON/APBI200'

const x2js = new X2JS();

const getEnrolmentInfo = (courseSection) => {

    
    return enrolmentInfo
}

const changeSections = (sectionObj) => {
    sectionObj.sections.section.map(oneSection => {
        oneSection.teachingunits.teachingunit.meetings.meeting.map(y => console.log(y))
    })
} 

const buildJSONOutput = (code, number, sections) => {
    const result = {
        number: [
            sections
        ]
    }
    //console.log(JSON.stringify(sections, null, 2))
}

const getCoursesForCode = (code) => {
    //fetch(baseURL + and + year + and + term + and + req4 + and + dept('APBI') + and + course(200) + and + output)
    return fetch(baseURL + and + year + and + term + and + req2 + and + dept(code) + and + output)
        .then(response => response.text())
        .then(text => x2js.xml2js(text))
        
}

const getSectionsForCourse = ({ code, courseNumbers }) => {

    courseNumbers.map(number => {
        fetch(baseURL + and + year + and + term + and + req4 + and + dept(code) + and + course(Number(number)) + and + output)
            .then(response => response.text())
            .then(text => x2js.xml2js(text))
            .then(sections => buildJSONOutput(code, number, sections))
    })
} 

const main = () => {
    departments.map(code => 
        getCoursesForCode(code).then(courseObject => {
            const courseNumbers = courseObject.courses.course.map(course => course._key)
            const codeAndNumbers = {
                code,
                courseNumbers: courseNumbers
            }
            getSectionsForCourse(codeAndNumbers)
        })
    )
    changeSections(APBI200)
}

export default main


//'https://courses.students.ubc.ca/cs/servlets/SRVCourseSchedule?&sessyr=2017&sesscd=W&req=4&dept=APBI&course=200&output=3'
//console.log(JSON.stringify(courses, null, 2))