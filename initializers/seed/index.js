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
    tutorials (callback) {
      models.tutorial.create(data.tutorials, callback)
    },
    projects (callback) {
      models.project.create(data.projects, callback)
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
