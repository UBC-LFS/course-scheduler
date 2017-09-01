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

const parseOutSections = (sectionsBlob, code, number) => {
    // if (code === "HUNU" && number == '649') {
    //     console.log(code, number, JSON.stringify(sectionsBlob, null, 2))
    // }
    if (typeof sectionsBlob.sections.section !== 'undefined' && sectionsBlob.sections.section.length > 0) {
        //console.log(code, number)
        const sectionNumber = sectionsBlob.sections.section.map(section => section._key)
        // const classes = sectionsBlob.sections.section.map(section => section.teachingunits.teachingunit.meetings.meeting)
        // const instructors = sectionsBlob.sections.section.map(section => section.instructors)
        // const activity = sectionsBlob.sections.section.map(section => section._activity)
        // const credits = sectionsBlob.sections.section.map(section => section._credits)
        console.log({sectionNumber, classes, instructors, activity, credits})
    } 
    else {
        //console.log(JSON.stringify(sectionsBlob.sections.section.teachingunits.teachingunit.meetings, null, 2))
        //console.log(code, number)
        const sectionNumber = sectionsBlob.sections.section._key
        const classes = sectionsBlob.sections.section.teachingunits.teachingunit.meetings.meeting
        const instructors = sectionsBlob.sections.section.instructors
        const activity = sectionsBlob.sections.section._activity
        const credits = sectionsBlob.sections.section._credits
        //console.log({sectionNumber, classes, instructors, activity, credits})

    } 
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
            .then(sectionsBlob => parseOutSections(sectionsBlob, code, number))
            .then(sections => ({code, number, sections}))
    })
} 

const main = () => {
    console.log(baseURL + and + year + and + term + and + req4 + and + dept("HUNU") + and + course("649") + and + output)
    departments.map(code => 
        getCoursesForCode(code).then(courseObject => {
            const courseNumbers = courseObject.courses.course.map(course => course._key)
            const codeAndNumbers = {
                code,
                courseNumbers: courseNumbers
            }
            Promise.all(getSectionsForCourse(codeAndNumbers))
                .then(arr => arr.map(obj => {
                    // console.log(obj)
                    if (Array.isArray(obj.sections)) {
                        obj.sections.map(sec => getEnrolmentInfo(obj.code, obj.number, sec, (enrolment) => {
                            //console.log({code: obj.code, number: obj.number, sec, enrolment})
                        }))
                    } else getEnrolmentInfo(obj.code, obj.number, obj.sections, (enrolment) => {
                        //console.log({code:obj.code, number: obj.number, sec: obj.sections, enrolment})
                    })
                }))
        })
    )
}

export default main
