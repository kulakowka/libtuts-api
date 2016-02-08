'use strict'

const async = require('async')
const debug = require('debug')('app:jobs')
const models = require('require-dir')('../../models', {recurse: true})

module.exports = function updateProjectsCount () {
  return models.platform.find().then(updatePlatforms)
}

function updatePlatforms (platforms) {
  async.map(platforms, updatePlatform, (err, results) => {
    if (err) return debug(err.message)
    debug('All platforms counters updated')
  })
}

function updatePlatform (platform, callback) {
  async.parallel({
    projectsCount: getProjectsCount(platform),
    tutorialsCount: getTutorialsCount(platform)
  }, (err, result) => {
    if (err) return callback(err)
    Object.assign(platform, result)
    debug(`Platform: ${platform.name} tutorialsCount = ${platform.tutorialsCount}`)
    platform.save(callback)
  })
}

function getProjectsCount (platform) {
  return (callback) => models.project.count({platform: platform.name}, callback)
}

function getTutorialsCount (platform) {
  return (callback) => models.tutorial.count({platforms: {$in: [platform.name]}}, callback)
}
