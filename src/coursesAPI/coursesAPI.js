import X2JS from 'x2js'
import { baseURL, and, year, term, req4, req3, req2, dept, course, output, departments, scrapeURL } from './constants.js'
import request from 'request'
import cheerio from 'cheerio'

import APBI200 from '../sampleJSON/APBI200'
import anotherSection from '../sampleJSON/anotherSection'

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

const parseOutSections = (sectionsBlob) => sectionsBlob.sections.section.map(section => section._key)

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
            //.then(result => console.log(JSON.stringify(result, null, 2)))
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

    console.log(parseOutSections(anotherSection))

    //changeSections(APBI200)
    // getEnrolmentInfo('APBI', 200, '001', (data) => console.log('APBI200', data))
    // getEnrolmentInfo('LFS', 500, '001', (data) => console.log('LFS500', data))
    // getEnrolmentInfo('APBI', 398, '001', (data) => console.log('APBI398', data))
    // getEnrolmentInfo('APBI', 361, '199', (data) => console.log('APBI361', data))
    // getEnrolmentInfo('APBI', 360, '001', (data) => console.log('APBI360', data))
}

export default main


//'https://courses.students.ubc.ca/cs/servlets/SRVCourseSchedule?&sessyr=2017&sesscd=W&req=4&dept=APBI&course=200&output=3'
//console.log(JSON.stringify(courses, null, 2))