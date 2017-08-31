export const baseURL = `https://courses.students.ubc.ca/cs/servlets/SRVCourseSchedule?`
export const departments = ['AANB', 'APBI', 'FNH', 'FOOD', 'FRE', 'GRS', 'HUNU', 'LFS', 'SOIL']
export const and = '&'
export const year = 'sessyr=2017'
export const term = 'sesscd=W'
export const req4 = 'req=4'
export const req3 = 'req=3'
export const req2 = 'req=2'
export const dept = (deptCode) => `dept=${deptCode}`
export const course = (courseCode) => `course=${courseCode}`
export const output = 'output=3'
export const scrapeURL = (code, number, section) => `https://courses.students.ubc.ca/cs/main?pname=subjarea&tname=subjareas&req=5&dept=${code}&course=${number}&section=${section}`
