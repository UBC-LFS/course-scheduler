import X2JS from 'x2js'
import { baseURL, and, year, term, req4, req3, req2, dept, course, output, departments, scrapeURL, createFileName } from './constants.js'
import request from 'request'
import cheerio from 'cheerio'
import { writeToCSV, setupHeaders } from './writeToCSV'
import fs from 'fs'

const x2js = new X2JS();

const getAllDeptCodes = () => {
    return fetch('https://courses.students.ubc.ca/cs/servlets/SRVCourseSchedule?&sessyr=2017&sesscd=W&output=2')
        .then(response => response.text())
        .then(text => x2js.xml2js(text))
}

// scrape website for enrolment data
const getEnrolmentInfo = (code, number, section, callback) => {
    const url = scrapeURL(code, number, section)
    request(url, (error, response, html) => {
        const $ = cheerio.load(html)
        const getNumberFromTD = (stringTerm) => {
            return $('td').filter(function () {
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

const parseOutHelperAndWriteToCSV = (section, code, number, sectionNumber, instructors, activity, credits, termCd, startWk, endWk, callback) => {
    if (typeof section.teachingunits.teachingunit.meetings.meeting !== 'undefined' && section.teachingunits.teachingunit.meetings.meeting.length > 0) {
        getEnrolmentInfo(code, number, sectionNumber, (enrolmentInfo) => {
            section.teachingunits.teachingunit.meetings.meeting.map(meeting => {
                const meetingObj = {
                    dept: code,
                    course: number,
                    sectionNumber,
                    meeting,
                    instructors,
                    activity,
                    credits,
                    enrolmentInfo,
                    termCd,
                    startWk,
                    endWk
                }
                callback(meetingObj)
            })
        })
    }
    else {
        getEnrolmentInfo(code, number, sectionNumber, (enrolmentInfo) => {
            const meetingObj = {
                dept: code,
                course: number,
                sectionNumber,
                meeting: section.teachingunits.teachingunit.meetings.meeting,
                instructors,
                activity,
                credits,
                enrolmentInfo,
                termCd,
                startWk,
                endWk
            }
            callback(meetingObj)
        })
    }
}

const parseOutSectionsAndAddEnrolment = (sectionsBlob, code, number, callback) => {
    // more than 1 section 
    if (typeof sectionsBlob.sections.section !== 'undefined' && sectionsBlob.sections.section.length > 0) {

        sectionsBlob.sections.section.map(section => {
            const sectionNumber = section._key
            const instructors = section.instructors
            const activity = section._activity
            const credits = section._credits
            const termCd = section.teachingunits.teachingunit._termcd
            const startWk = section.teachingunits.teachingunit._startwk
            const endWk = section.teachingunits.teachingunit._endwk
            // for sections with NO meeting times
            if (typeof section.teachingunits.teachingunit.meetings === 'undefined') {
                return
            }
            parseOutHelperAndWriteToCSV(section, code, number, sectionNumber, instructors, activity, credits, termCd, startWk, endWk, (obj) => {
                callback(obj)
            })
        })
    }
    else {
        //only one section
        const section = sectionsBlob.sections.section
        const sectionNumber = section._key
        // for sections with NO meeting times
        if (typeof sectionsBlob.sections.section.teachingunits.teachingunit.meetings === 'undefined') {
            return
        }

        const classes = section.teachingunits.teachingunit.meetings.meeting
        const instructors = section.instructors
        const activity = section._activity
        const credits = section._credits
        const termCd = section.teachingunits.teachingunit._termcd
        const startWk = section.teachingunits.teachingunit._startwk
        const endWk = section.teachingunits.teachingunit._endwk
        parseOutHelperAndWriteToCSV(section, code, number, sectionNumber, instructors, activity, credits, termCd, startWk, endWk, (obj) => {
            callback(obj)
        })
    }
}

const getCoursesForCode = (code) => (
    fetch(baseURL + and + year + and + term + and + req2 + and + dept(code) + and + output)
        .then(response => response.text())
        .then(text => x2js.xml2js(text))
)

// returns object in this form: { code: 'GRS', number: '290', sections: ['001', '104] }
const getSectionsForCourse = ({ code, courseNumbers }, arrayOfDept) => {
    courseNumbers.map(number => {
        fetch(baseURL + and + year + and + term + and + req4 + and + dept(code) + and + course(number) + and + output)
            .then(response => response.text())
            .then(text => x2js.xml2js(text))
            .then(sectionsBlob => parseOutSectionsAndAddEnrolment(sectionsBlob, code, number, (result) => {
                writeToCSV(result, arrayOfDept)
            }))
    })
}

const getDept = (arrayOfDept) => {
    setupHeaders(arrayOfDept)
    arrayOfDept.map(code =>
        getCoursesForCode(code).then(courseObject => {
            const courseNumbers = courseObject.courses.course.map(course => course._key)
            const codeAndNumbers = {
                code,
                courseNumbers: courseNumbers
            }
            getSectionsForCourse(codeAndNumbers, arrayOfDept)
        })
    )
    return new Promise((resolve, reject) => {
        const fileName = createFileName(arrayOfDept) + ".csv"
        const checkIfFileExists = (timeDiff, consecTimeSame) => fs.stat(__dirname + "/../../public/output/" + fileName, (err, stat) => {
            if (err == null) {
                const lastModified = stat.mtime
                const createdTime = stat.birthtime
                const timeSinceModified = lastModified.getTime()-createdTime.getTime()
                if (timeDiff === timeSinceModified) consecTimeSame++
                console.log(createdTime.getTime(), lastModified.getTime(), lastModified.getTime()-createdTime.getTime())
                console.log(consecTimeSame)
                if (consecTimeSame > 15) {
                    resolve('file is ready for download!')
                    return
                }
                setTimeout(checkIfFileExists, 1000, timeSinceModified, consecTimeSame)
            } else {
                console.log('file does not exist')
                setTimeout(checkIfFileExists, 1000, 0, 0)
            }
        })
        checkIfFileExists(0, 0)
    })
}

export {
    getDept,
    getAllDeptCodes
} 
