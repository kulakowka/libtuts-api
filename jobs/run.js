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
  startPlatformJobs()
  startLanguageJobs()
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

/*

Придумал как обновлять кол-во статей у проектов

  Каждый час запускается задание:
    Надо брать все статьи, которые были обновлены за последний час.
    Выбирать все проекты к которым они отнесены.
    Дальше каждому из этих проектов обновлять каунтер.
 */

