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
    }
  }, (err, result) => {
    if (err) return console.log(err)

    for (let model in result) {
      console.log('%s: %d', model, result[model].length)
    }
    mongoose.connection.close()
  })
}
