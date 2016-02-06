'use strict'

const debug = require('debug')('app:jobs')
const models = require('require-dir')('../../models', {recurse: true})

module.exports = function updateProjectsCount () {
  return models.platform.find().then(updatePlatforms).then(platforms => debug(`/platform/updateProjectsCount`)).catch(err => debug(err))
}

function updatePlatforms (platforms) {
  return Promise.all(platforms.map(updatePlatform))
}

function updatePlatform (platform) {
  return models.project.count({platform: platform.name}).then(count => {
    if (platform.projectsCount === count) return;
    platform.projectsCount = count
    platform.save()
  })
}
