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
    if (Array.isArray(instructors.instructor)) {
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

const writeToCSV = () => {
    const fields = ['dept', 'course', 'sectionNumber', 'meeting', 'instructors', 'activity', 'credits', 'enrolmentInfo']
    console.log(flattenJSON(testJSON))
    console.log(flattenJSON(testJSONWithTwoInstructors))
    
    //const toCSV = json2csv({data: testJSON, fields})

    // console.log(toCSV)
}

export default writeToCSV