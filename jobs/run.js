const debug = require('debug')('app:jobs:platform:updateProjectsCount')
const jobs = require('require-dir')('.', {recurse: true})
const mongoose = require('../utils/mongoose')
const schedule = require('node-schedule')

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
  schedule.scheduleJob('*/1 * * * *', jobs.platform.updateProjectsCount)
  schedule.scheduleJob('*/1 * * * *', jobs.language.updateProjectsCount)
}
