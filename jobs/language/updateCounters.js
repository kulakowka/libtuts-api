'use strict'

const async = require('async')
const debug = require('debug')('app:jobs')
const models = require('require-dir')('../../models', {recurse: true})

module.exports = function updateProjectsCount () {
  return models.language.find().then(updateLanguages)
}

function updateLanguages (languages) {
  async.map(languages, updateLanguage, (err, results) => {
    if (err) return debug(err.message)
    debug('All languages counters updated')
  })
}

function updateLanguage (language, callback) {
  async.parallel({
    projectsCount: getProjectsCount(language),
    tutorialsCount: getTutorialsCount(language)
  }, (err, result) => {
    if (err) return callback(err)
    Object.assign(language, result)
    debug(`Platform: ${language.name} tutorialsCount = ${language.tutorialsCount}`)
    language.save(callback)
  })
}

function getProjectsCount (language) {
  return (callback) => models.project.count({language: language.name}, callback)
}

function getTutorialsCount (language) {
  return (callback) => models.tutorial.count({languages: {$in: [language.name]}}, callback)
}
