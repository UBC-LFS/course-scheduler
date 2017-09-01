import X2JS from 'x2js'
import { baseURL, and, year, term, req4, req3, req2, dept, course, output, departments, scrapeURL } from './constants.js'
import request from 'request'
import cheerio from 'cheerio'

const x2js = new X2JS();

// scrape website for enrolment data
const getEnrolmentInfo = (code, number, section, callback) => {
    const url = scrapeURL(code, number, section)
    request(url, (error, response, html) => {
        const $ = cheerio.load(html)
        const getNumberFromTD = (stringTerm) => {
            return $('td').filter(function(){
                return $(this).text().trim() === stringTerm
            }).next().text()
        }
        const totalSeatsRemaining = getNumberFromTD('Total Seats Remaining:')
        const currentlyRegistered = getNumberFromTD('Currently Registered:')
        const generalSeatsRemaining = getNumberFromTD('General Seats Remaining:')
        const restrictedSeatsRemaining = getNumberFromTD('Restricted Seats Remaining*:')
        callback({ totalSeatsRemaining, currentlyRegistered, generalSeatsRemaining, restrictedSeatsRemaining })
    })
}

const parseOutSections = (sectionsBlob) => {
     if (typeof sectionsBlob.sections.section !== 'undefined' && sectionsBlob.sections.section.length > 0) return sectionsBlob.sections.section.map(section => section._key)
     else return sectionsBlob.sections.section._key
}

const getCoursesForCode = (code) => (
    fetch(baseURL + and + year + and + term + and + req2 + and + dept(code) + and + output)
        .then(response => response.text())
        .then(text => x2js.xml2js(text))
)


// returns object in this form: { code: 'GRS', number: '290', sections: ['001', '104] }
const getSectionsForCourse = ({ code, courseNumbers }) => {
    return courseNumbers.map(number => {
        return fetch(baseURL + and + year + and + term + and + req4 + and + dept(code) + and + course(number) + and + output)
            .then(response => response.text())
            .then(text => x2js.xml2js(text))
            .then(sectionsBlob => parseOutSections(sectionsBlob))
            .then(sections => ({code, number, sections}))
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
            Promise.all(getSectionsForCourse(codeAndNumbers))
                .then(arr => arr.map(obj => {
                    if (Array.isArray(obj.sections)) {
                        obj.sections.map(sec => getEnrolmentInfo(obj.code, obj.number, sec, (result) => {
                            console.log(obj.code, obj.number, sec, result)
                        }))
                    } else getEnrolmentInfo(obj.code, obj.number, obj.sections, (result) => {
                        console.log(obj.code, obj.number, obj.sections, result)
                    })
                }))
        })
    )
}

export default main


//'https://courses.students.ubc.ca/cs/servlets/SRVCourseSchedule?&sessyr=2017&sesscd=W&req=4&dept=APBI&course=200&output=3'
//console.log(JSON.stringify(courses, null, 2))

// R.map(sec => getEnrolmentInfo(obj.code, obj.number, sec, (result) => {
//     console.log(obj.code, obj.number, sec, result)
// })), obj.sections)

// .then(arr => arr.map(obj => 
//     R.map(sec => getEnrolmentInfo(obj.code, obj.number, sec, (result) => {
//         console.log(obj.code, obj.number, sec, result)
//     }), obj.sections)
// ))