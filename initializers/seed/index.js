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
        if (err) return callback(err)
        models.project.create(projects, callback)
      })
    },
    tutorials (callback) {
      mapTutorials(data.tutorials, (err, tutorials) => {
        if (err) return callback(err)
        models.tutorial.create(tutorials, callback)
      })
    },
    comments (callback) {
      mapComments(data.comments, (err, comments) => {
        if (err) return callback(err)
        models.comment.create(comments, callback)
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

// Helpers for data seed
function mapComments (comments, callback) {
  async.map(comments, fillCommentRelations, callback)
}

function fillCommentRelations (comment, callback) {
  models.tutorial.find({}, (err, tutorials) => {
    if (err) return callback(err)
    let tutorial = tutorials.pop()
    comment.tutorial = tutorial.id
    callback(null, comment)
  })
}

function mapProjects (projects, callback) {
  async.map(projects, fillProjectRelations, callback)
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

function mapTutorials (tutorials, callback) {
  async.map(tutorials, fillTutorialRelations, callback)
}

function fillTutorialRelations (tutorial, callback) {
  loadPlatforms(tutorial, (err, platforms) => {
    if (err) return callback(err)
    tutorial.platforms = platforms.map(p => p.id)
    loadLanguages(tutorial, (err, languages) => {
      if (err) return callback(err)
      tutorial.languages = languages.map(l => l.id)
      loadProjects(tutorial, (err, projects) => {
        if (err) return callback(err)
        tutorial.projects = projects.map(l => l.id)
        callback(null, tutorial)
      })
    })
  })
}

function loadProjects (model, callback) {
  models.project.find({slug: {$in: model.projects}}, callback)
}

function loadPlatforms (model, callback) {
  models.platform.find({slug: {$in: model.platforms}}, callback)
}

function loadLanguages (model, callback) {
  models.language.find({slug: {$in: model.languages}}, callback)
}
