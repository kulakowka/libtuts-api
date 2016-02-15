'use strict'

const async = require('async')
const debug = require('debug')('app:jobs')
const models = require('require-dir')('../../models', {recurse: true})

module.exports = function updateUserCounters (date) {
  async.parallel({
    comments: getLatestComments(date),
    tutorials: getLatestTutorials(date)
  }, updateUsersCounters)
}

function updateUsersCounters (err, result) {
  if (err) return console.log(err)
  let users = new Set()
  result.comments.forEach(comment => {
    users.add(comment.creator.toString())
  })
  result.tutorials.forEach(tutorial => {
    users.add(tutorial.creator.toString())
  })
  let usersIds = Array.from(users)
  models.user.find({_id: {$in: usersIds}}).then(updateUsers)
}

function updateUsers (users) {
  debug('Update commentsCount and tutorialsCount for %d users ', users.length)
  async.map(users, updateUser, (err, results) => {
    if (err) return debug(err.message)
    debug('All users counters updated')
  })
}

function updateUser (user, callback) {
  async.parallel({
    commentsCount: getCommentsCount(user._id),
    tutorialsCount: getTutorialsCount(user._id)
  }, (err, result) => {
    if (err) return callback(err)
    Object.assign(user, result)
    debug(`User: ${user.username} commentsCount = ${user.commentsCount} tutorialsCount = ${user.tutorialsCount}`)
    user.save(callback)
  })
}

function getCommentsCount (creator) {
  return (callback) => models.comment.count({creator}, callback)
}

function getTutorialsCount (creator) {
  return (callback) => models.tutorial.count({creator}, callback)
}

function getLatestComments (date) {
  return (callback) => models.comment.find({updatedAt: {$gte: date}}).select('creator').exec(callback)
}

function getLatestTutorials (date) {
  return (callback) => models.tutorial.find({updatedAt: {$gte: date}}).select('creator').exec(callback)
}
