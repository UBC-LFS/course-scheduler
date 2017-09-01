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
Navigate to http://localhost:8080/courses. It will run the application and output the results to output.csv in the root directory of course-scheduler.

## Disclaimer
I wrote this program over a period of 3 days whenever I had some spare time. I did not have time to write tests. It seems to work properly, but I make no guarantees!