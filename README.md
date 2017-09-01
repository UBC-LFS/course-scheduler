# UBC Course Schedule 

This Node application outputs a CSV of all course sections, along with enrolment data, for a given department code (or array of codes).

It may take some time to run, depending on the number of sections, because the enrolment data is not returned via the courses.students API, and must be scraped.

## To get started
First, clone the repo. You'll need both Git and Node installed on your machine to run.
``` 
git clone https://github.com/UBC-LFS/course-scheduler.git
``` 
Then, in terminal:
``` 
cd course-scheduler
``` 
Install the dependencies via NPM
```javascript
npm install
``` 
To run for your department, simply edit the department codes in src/coursesAPI/constants.js
```javascript
export const departments = ['COMM']
```

It can also take an array of dept as follows:
```javascript
export const departments = ['AANB', 'APBI', 'FNH', 'FOOD', 'FRE', 'GRS', 'HUNU', 'LFS', 'SOIL']
```

You may also need to change the year and term as needed
```javascript
export const year = 'sessyr=2017'
export const term = 'sesscd=W'
```
Now start the application
``` 
npm start
``` 
Navigate to http://localhost:8080/courses on your browser. It will run the application and output the results to output.csv in the root directory of course-scheduler.

## Disclaimer
I wrote this program over a period of 3 days whenever I had some spare time. I did not have time to write tests. It seems to work properly, but I make no guarantees!

### Example
Setting the department just to AANB (Applied Animal Biology) as such:
```javascript
export const departments = ['AANB']
```
Returns an 'output.csv' of the following (first line is the CSV header)

| dept   | course | sectionNumber | term              | day           | startTime | endTime | buildingCd | building           | roomNo               | instructors | activity  | credits | totalSeatsRemaining | currentlyRegistered | generalSeatsRemaining | restrictedSeatsRemaining | termCd         | startWk        | endWk          | 
|--------|--------|---------------|-------------------|---------------|-----------|---------|------------|--------------------|----------------------|-------------|-----------|---------|---------------------|---------------------|-----------------------|--------------------------|----------------|----------------|----------------| 
| "AANB" | "504"  | "002"         | "1"               | "Tue"         | "11:00"   | "12:30" | "MCML"     | "MacMillan"        | "258"                | "TBD"       | "Lecture" | "3"     | "25"                | "0"                 | "25"                  | "0"                      | "1"            | "Sep 05, 2017" | "Dec 01, 2017" | 
| "AANB" | "504"  | "002"         | "1"               | "Thu"         | "11:00"   | "12:30" | "MCML"     | "MacMillan"        | "258"                | "TBD"       | "Lecture" | "3"     | "25"                | "0"                 | "25"                  | "0"                      | "1"            | "Sep 05, 2017" | "Dec 01, 2017" | 
| "AANB" | "551"  | "003"         | "1-2"," "," "," " | "NSM"         | "NSM"     | "NSM"   | "TBD"      | "Seminar"          | "3"                  | "6"         | "1"       | "6"     | "0"                 | "1-2"               | "Sep 05, 2017"        | "Apr 06, 2018"           |                |                |                | 
| "AANB" | "649"  | "001"         | "1"," "," "," "   | "NSM"         | "NSM"     | "NSM"   | "TBD"      | "Thesis"           | "0"                  | "19"        | "1"       | "19"    | "0"                 | "1"                 | "Sep 05, 2017"        | "Dec 01, 2017"           |                |                |                | 
| "AANB" | "549B" | "003"         | "1-2"," "," "," " | "NSM"         | "NSM"     | "NSM"   | "TBD"      | "Thesis"           | "18"                 | "7"         | "3"       | "7"     | "0"                 | "1-2"               | "Sep 05, 2017"        | "Apr 06, 2018"           |                |                |                | 
| "AANB" | "530D" | "001"         | "1"," "," "," "   | "NSM"         | "NSM"     | "NSM"   | "TBD"      | "Directed Studies" | "2"                  | "5"         | "0"       | "5"     | "0"                 | "1"                 | "Sep 05, 2017"        | "Dec 01, 2017"           |                |                |                | 
| "AANB" | "649"  | "002"         | "2"," "," "," "   | "NSM"         | "NSM"     | "NSM"   | "TBD"      | "Thesis"           | "0"                  | "20"        | "0"       | "20"    | "0"                 | "2"                 | "Jan 03, 2018"        | "Apr 06, 2018"           |                |                |                | 
| "AANB" | "549A" | "002"         | "2"," "," "," "   | "NSM"         | "NSM"     | "NSM"   | "TBD"      | "Thesis"           | "12"                 | "20"        | "0"       | "20"    | "0"                 | "2"                 | "Jan 03, 2018"        | "Apr 06, 2018"           |                |                |                | 
| "AANB" | "515"  | "002"         | "2"," "," "," "   | "NSM"         | "NSM"     | "NSM"   | "TBD"      | "Lecture"          | "3"                  | "4"         | "1"       | "4"     | "0"                 | "2"                 | "Jan 03, 2018"        | "Apr 06, 2018"           |                |                |                | 
| "AANB" | "649"  | "003"         | "1-2"," "," "," " | "NSM"         | "NSM"     | "NSM"   | "TBD"      | "Thesis"           | "0"                  | "7"         | "13"      | "7"     | "0"                 | "1-2"               | "Sep 05, 2017"        | "Apr 06, 2018"           |                |                |                | 
| "AANB" | "549A" | "003"         | "1-2"," "," "," " | "NSM"         | "NSM"     | "NSM"   | "TBD"      | "Thesis"           | "12"                 | "19"        | "1"       | "19"    | "0"                 | "1-2"               | "Sep 05, 2017"        | "Apr 06, 2018"           |                |                |                | 
| "AANB" | "530A" | "002"         | "2"," "," "," "   | "NSM"         | "NSM"     | "NSM"   | "TBD"      | "Directed Studies" | "3"                  | "5"         | "0"       | "5"     | "0"                 | "2"                 | "Jan 03, 2018"        | "Apr 06, 2018"           |                |                |                | 
| "AANB" | "549A" | "001"         | "1"," "," "," "   | "NSM"         | "NSM"     | "NSM"   | "TBD"      | "Thesis"           | "12"                 | "20"        | "0"       | "20"    | "0"                 | "1"                 | "Sep 05, 2017"        | "Dec 01, 2017"           |                |                |                | 
| "AANB" | "500"  | "KRS"         | "1-2"             | "Mon"," "," " | "NSM"     | "NSM"   | "NSM"      | "TBD"              | "Distance Education" | "n/a"       | "0"       | "0"     | "0"                 | "0"                 | "X"                   | "Aug 21, 2017"           | "Aug 13, 2018" |                |                | 
| "AANB" | "530C" | "003"         | "1-2"," "," "," " | "NSM"         | "NSM"     | "NSM"   | "TBD"      | "Directed Studies" | "6"                  | "5"         | "0"       | "5"     | "0"                 | "1-2"               | "Sep 05, 2017"        | "Apr 06, 2018"           |                |                |                | 
| "AANB" | "530D" | "003"         | "1-2"," "," "," " | "NSM"         | "NSM"     | "NSM"   | "TBD"      | "Directed Studies" | "2"                  | "5"         | "0"       | "5"     | "0"                 | "1-2"               | "Sep 05, 2017"        | "Apr 06, 2018"           |                |                |                | 
| "AANB" | "530B" | "002"         | "2"," "," "," "   | "NSM"         | "NSM"     | "NSM"   | "TBD"      | "Directed Studies" | "3"                  | "0"         | "0"       | "0"     | "0"                 | "2"                 | "Jan 03, 2018"        | "Apr 06, 2018"           |                |                |                | 
| "AANB" | "549B" | "002"         | "2"," "," "," "   | "NSM"         | "NSM"     | "NSM"   | "TBD"      | "Thesis"           | "18"                 | "10"        | "0"       | "10"    | "0"                 | "2"                 | "Jan 03, 2018"        | "Apr 06, 2018"           |                |                |                | 
| "AANB" | "530B" | "003"         | "1-2"," "," "," " | "NSM"         | "NSM"     | "NSM"   | "TBD"      | "Directed Studies" | "3"                  | "5"         | "0"       | "5"     | "0"                 | "1-2"               | "Sep 05, 2017"        | "Apr 06, 2018"           |                |                |                | 
| "AANB" | "530C" | "002"         | "2"," "," "," "   | "NSM"         | "NSM"     | "NSM"   | "TBD"      | "Directed Studies" | "6"                  | "5"         | "0"       | "5"     | "0"                 | "2"                 | "Jan 03, 2018"        | "Apr 06, 2018"           |                |                |                | 
| "AANB" | "530C" | "001"         | "1"," "," "," "   | "NSM"         | "NSM"     | "NSM"   | "TBD"      | "Directed Studies" | "6"                  | "0"         | "0"       | "0"     | "0"                 | "1"                 | "Sep 05, 2017"        | "Dec 01, 2017"           |                |                |                | 
| "AANB" | "500"  | "003"         | "1-2"," "," "," " | "NSM"         | "NSM"     | "NSM"   | "TBD"      | "Thesis"           | "3"                  | "9"         | "1"       | "9"     | "0"                 | "1-2"               | "Sep 05, 2017"        | "Apr 06, 2018"           |                |                |                | 
| "AANB" | "500"  | "003"         | "1-2"," "," "," " | "NSM"         | "NSM"     | "NSM"   | "TBD"      | "Thesis"           | "3"                  | "9"         | "1"       | "9"     | "0"                 | "1-2"               | "Sep 05, 2017"        | "Apr 06, 2018"           |                |                |                | 
| "AANB" | "530A" | "001"         | "1"," "," "," "   | "NSM"         | "NSM"     | "NSM"   | "TBD"      | "Directed Studies" | "3"                  | "5"         | "0"       | "5"     | "0"                 | "1"                 | "Sep 05, 2017"        | "Dec 01, 2017"           |                |                |                | 
| "AANB" | "549B" | "001"         | "1"," "," "," "   | "NSM"         | "NSM"     | "NSM"   | "TBD"      | "Thesis"           | "18"                 | "8"         | "2"       | "8"     | "0"                 | "1"                 | "Sep 05, 2017"        | "Dec 01, 2017"           |                |                |                | 
| "AANB" | "530B" | "001"         | "1"," "," "," "   | "NSM"         | "NSM"     | "NSM"   | "TBD"      | "Directed Studies" | "3"                  | "5"         | "0"       | "5"     | "0"                 | "1"                 | "Sep 05, 2017"        | "Dec 01, 2017"           |                |                |                | 
| "AANB" | "530D" | "002"         | "2"," "," "," "   | "NSM"         | "NSM"     | "NSM"   | "TBD"      | "Directed Studies" | "2"                  | "5"         | "0"       | "5"     | "0"                 | "2"                 | "Jan 03, 2018"        | "Apr 06, 2018"           |                |                |                | 
| "AANB" | "530A" | "003"         | "1-2"," "," "," " | "NSM"         | "NSM"     | "NSM"   | "TBD"      | "Directed Studies" | "3"                  | "5"         | "0"       | "5"     | "0"                 | "1-2"               | "Sep 05, 2017"        | "Apr 06, 2018"           |                |                |                | 
