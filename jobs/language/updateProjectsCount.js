'use strict'

const debug = require('debug')('app:jobs')
const models = require('require-dir')('../../models', {recurse: true})

module.exports = function updateProjectsCount () {
  return models.language.find().then(updateLanguages).then(languages => debug(`/language/updateProjectsCount`)).catch(err => debug(err))
}

function updateLanguages (languages) {
  return Promise.all(languages.map(updateLanguage))
}

function updateLanguage (language) {
  return models.project.count({language: language.id}).then(count => {
    if (language.projectsCount === count) return;
    language.projectsCount = count
    language.save()
  })
}
