import fs from 'fs'
import json2csv from 'json2csv'


const testJSON = {
    dept: 'FRE',
    course: '518',
    sectionNumber: '001',
    meeting:
    {
        _term: '2',
        _day: 'Wed',
        _starttime: '10:30',
        _endtime: '12:00',
        _buildingcd: 'MCML',
        _building: 'MacMillan',
        _roomno: '258'
    },
    instructors: { 
        instructor: { 
            _name: 'WISEMAN, KELLEEN', 
            _ubcid: '920661' 
        } 
    },
    activity: 'Lecture',
    credits: '1.5',
    enrolmentInfo: {
        totalSeatsRemaining: '25',
        currentlyRegistered: '0',
        generalSeatsRemaining: '0',
        restrictedSeatsRemaining: '25'
    }
}
const testJSONWithTwoInstructors = {
    dept: 'FRE',
    course: '518',
    sectionNumber: '001',
    meeting:
    {
        _term: '2',
        _day: 'Wed',
        _starttime: '10:30',
        _endtime: '12:00',
        _buildingcd: 'MCML',
        _building: 'MacMillan',
        _roomno: '258'
    },
    instructors: { 
        instructor: [{ 
            _name: 'WISEMAN, KELLEEN', 
            _ubcid: '920661' 
        },{ 
            _name: 'LEE, JUSTIN', 
            _ubcid: '920661' 
        } ] 
    },
    activity: 'Lecture',
    credits: '1.5',
    enrolmentInfo: {
        totalSeatsRemaining: '25',
        currentlyRegistered: '0',
        generalSeatsRemaining: '0',
        restrictedSeatsRemaining: '25'
    }
}

const flattenJSON = ({ dept, course, sectionNumber, meeting, instructors, activity, credits, enrolmentInfo }) => {
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
    const flattened = {
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
        restrictedSeatsRemaining: enrolmentInfo.restrictedSeatsRemaining
    }
    return flattened
}

const writeToCSV = (meetingObj) => {
    const fields = ['dept', 'course', 'sectionNumber', 'term', 'day', 'startTime', 'endTime', 'buildingCd', 'building', 'roomNo', 
        'instructors', 'activity', 'credits', 'totalSeatsRemaining', 'currentlyRegistered', 'generalSeatsRemaining', 'restrictedSeatsRemaining']
    const flattendJSON = flattenJSON(meetingObj)
    const csv = json2csv({data: flattendJSON, fields})

    fs.stat('output.csv', (err, stat) => {
        if (err == null) {
            fs.appendFile('output.csv', csv, (err) => {
                if (err) throw err
            })
        } else {
            fs.writeFile('output.csv', fields, (err, stat) => {
                if (err) throw err
            })
        }
    })
}

export default writeToCSV