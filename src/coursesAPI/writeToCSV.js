import fs from 'fs'
import json2csv from 'json2csv'
import { createFileName } from './constants'

const fields = ['dept', 'course', 'sectionNumber', 'term', 'day', 'startTime', 'endTime', 'buildingCd', 'building', 'roomNo', 
'instructors', 'activity', 'credits', 'totalSeatsRemaining', 'currentlyRegistered', 'generalSeatsRemaining', 'restrictedSeatsRemaining', 'termCd', 'startWk', 'endWk']


const flattenJSON = ({ dept, course, sectionNumber, meeting, instructors, activity, credits, enrolmentInfo, termCd, startWk, endWk }) => {
    let instructorName
    if (typeof instructors === 'undefined') {
        instructorName = 'TBD'
    }
    else if (typeof instructors.instructor === 'undefined') {
        instructorName = 'N/A'
    } else if (Array.isArray(instructors.instructor)) {
        instructorName = instructors.instructor.map(x => x._name + ";").join(' ')
    } else {
        instructorName = instructors.instructor._name
    }
    return ({
        dept,
        course,
        sectionNumber,
        term: meeting._term,
        day: meeting._day,
        startTime: meeting._starttime,
        endTime: meeting._endtime,
        buildingCd: meeting._buildingcd,
        building: meeting._building,
        roomNo: meeting._roomno,
        instructors: instructorName,
        activity,
        credits,
        totalSeatsRemaining: enrolmentInfo.totalSeatsRemaining,
        currentlyRegistered: enrolmentInfo.currentlyRegistered,
        generalSeatsRemaining: enrolmentInfo.generalSeatsRemaining,
        restrictedSeatsRemaining: enrolmentInfo.restrictedSeatsRemaining,
        termCd,
        startWk,
        endWk
    })
}

const writeToCSV = (meetingObj, arrayOfDept) => {
    const fileName = createFileName(arrayOfDept) + ".csv"
    const flattendJSON = flattenJSON(meetingObj)
    const csv = json2csv({data: flattendJSON, fields, hasCSVColumnTitle: false})
    fs.stat(__dirname + "/../../public/output/" + fileName, (err, stat) => {
        if (err == null) {
            const csvToWrite = csv + "\r\n"
            fs.appendFile(__dirname + "/../../public/output/" + fileName, csvToWrite, (err) => {
                    if (err) throw err
                })
            } 
    })
}

const setupHeaders = (arrayOfDept) => {
    const fileName = createFileName(arrayOfDept) + ".csv"
    fs.stat(__dirname + "/../../public/output/" + fileName, (err, stat) => {
        const fieldsToWrite = fields + "\r\n"
        fs.writeFile(__dirname + "/../../public/output/" + fileName, fieldsToWrite, (err, stat) => {
            if (err) throw err
        })
    })
}

export { 
    writeToCSV,
    setupHeaders
} 
    