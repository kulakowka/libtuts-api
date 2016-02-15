'use strict'

const async = require('async')
const debug = require('debug')('app:jobs')
const models = require('require-dir')('../../models', {recurse: true})

module.exports = function updateTutorialCounters (date) {
  return () => models.comment.find({updatedAt: {$gte: date}}).sort('-updatedAt').select('tutorial').then(updateCommentsArticles)
}

function updateCommentsArticles (comments) {
  let tutorials = new Set()
  comments.forEach(comment => {
    tutorials.add(comment.tutorial)
  })
  let tutorialsIds = Array.from(tutorials)
  models.tutorial.find({_id: {$in: tutorialsIds}}).then(updateTutorials)
}

function updateTutorials (tutorials) {
  debug('Update commentsCount for %d tutorials ', tutorials.length)
  async.map(tutorials, updateTutorial, (err, results) => {
    if (err) return debug(err.message)
    debug('All tutorials counters updated')
  })
}

function updateTutorial (tutorial, callback) {
  async.parallel({
    commentsCount: getCommentsCount(tutorial._id)
  }, (err, result) => {
    if (err) return callback(err)
    Object.assign(tutorial, result)
    debug(`Tutorial: ${tutorial.title} commentsCount = ${tutorial.commentsCount}`)
    tutorial.save(callback)
  })
}

function getCommentsCount (tutorial) {
  return (callback) => models.comment.count({tutorial}, callback)
}
