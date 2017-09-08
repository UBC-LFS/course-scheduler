import fetch from 'isomorphic-fetch'
import { Router } from 'express';
import { getDept, getAllDeptCodes } from './coursesAPI/coursesAPI'
import { createFileName } from './coursesAPI/constants'

const routes = Router();

/**
 * GET home page
 */


// function that writes csv

routes.get('//', (req, res) => {
  res.render('index', { title: 'Course Section Generator' });
});

routes.get('//deptCodes', (req, res) => {
  getAllDeptCodes().then(x => res.send(x))
})

routes.get('//sections', (req, res) => {
  const dept = req.query.codes
  const arrayOfDepts = dept.split(' ')
  getDept(arrayOfDepts).then(x => {
    res.send('https://secure.landfood.ubc.ca/course-scheduler/output/' + createFileName(arrayOfDepts) + '.csv')
  })
})

/**
 * GET /list
 *
 * This is a sample route demonstrating
 * a simple approach to error handling and testing
 * the global error handler. You most certainly want to
 * create different/better error handlers depending on
 * your use case.
 */
routes.get('//list', (req, res, next) => {
  const { title } = req.query;

  if (title == null || title === '') {
    // You probably want to set the response HTTP status to 400 Bad Request
    // or 422 Unprocessable Entity instead of the default 500 of
    // the global error handler (e.g check out https://github.com/kbariotis/throw.js).
    // This is just for demo purposes.
    next(new Error('The "title" parameter is required'));
    return;
  }

  res.render('index', { title });
});

export default routes;
