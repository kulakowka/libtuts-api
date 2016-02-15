const jobs = require('require-dir')('.', {recurse: true})
const mongoose = require('../utils/mongoose')
const schedule = require('node-schedule')
const moment = require('moment')

/*
Schedule
*    *    *    *    *    *
┬    ┬    ┬    ┬    ┬    ┬
│    │    │    │    │    |
│    │    │    │    │    └ day of week (0 - 7) (0 or 7 is Sun)
│    │    │    │    └───── month (1 - 12)
│    │    │    └────────── day of month (1 - 31)
│    │    └─────────────── hour (0 - 23)
│    └──────────────────── minute (0 - 59)
└───────────────────────── second (0 - 59, OPTIONAL)
 */

mongoose.connection.on('connected', startJobs)

function startJobs () {
  startPlatformJobs()
  startLanguageJobs()
  startProjectJobs()
  startTutorialJobs()
}

function startPlatformJobs () {
  var rule = new schedule.RecurrenceRule()
  rule.minute = [10, 20, 30, 40, 50, 60]
  schedule.scheduleJob(rule, jobs.platform.updateCounters)
}

function startLanguageJobs () {
  var rule = new schedule.RecurrenceRule()
  rule.minute = [5, 15, 25, 35, 45, 55]
  schedule.scheduleJob(rule, jobs.language.updateCounters)
}

// По такому же принципу можно обновлять кол-во комментов у статей. ЩАас попробую.
function startProjectJobs () {
  var date = moment().add(-2, 'minutes')
  schedule.scheduleJob('*/3 * * * *', jobs.project.updateCounters(date))
}

function startTutorialJobs () {
  var date = moment().add(-2, 'minutes')
  schedule.scheduleJob('*/1 * * * *', jobs.tutorial.updateCounters(date))
}
