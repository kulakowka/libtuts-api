'use strict'

const async = require('async')
const rd = require('require-dir')
const mongoose = require('../../utils/mongoose')
const models = rd('../../models', {recurse: true})
const data = rd('./data')

mongoose.connection.once('open', () => mongoose.connection.db.dropDatabase(seedData))

function seedData () {
  async.series({
    users (callback) {
      models.user.create(data.users, callback)
    },
    languages (callback) {
      models.language.create(data.languages, callback)
    },
    platforms (callback) {
      models.platform.create(data.platforms, callback)
    },
    projects (callback) {
      mapProjects(data.projects, (err, projects) => {
        if (err) return console.log(err)
        models.project.create(projects, callback)
      })
    }
  }, (err, result) => {
    if (err) return console.log(err)

    for (let model in result) {
      console.log('%s: %d', model, result[model].length)
    }
    mongoose.connection.close()
  })
}
function fillProjectRelations (project, callback) {
  loadPlatform(project, (err, platform) => {
    if (err) return callback(err)
    project.platform = platform.id
    loadLanguage(project, (err, language) => {
      if (err) return callback(err)
      project.language = language.id
      callback(null, project)
    })
  })
}

function loadPlatform (model, callback) {
  models.platform.findOne({slug: model.platform}, callback)
}

function loadLanguage (model, callback) {
  models.language.findOne({slug: model.language}, callback)
}

function mapProjects (projects, callback) {
  async.map(projects, fillProjectRelations, callback)
}
