'use strict'

const models = require('require-dir')('../../models', {recurse: true})

module.exports = (req, res) => {
  return findUser(req.body.identifier).then(user => {
    if (!user) return null
    return new Promise((resolve, reject) => {
      user.comparePassword(req.body.password, (err, match) => {
        if (err) return reject(err)
        if (!match) return resolve(null)
        user.password = null
        resolve(user)
      })
    })
  })
}

function findUser (identifier) {
  return models.user.findOne({
    $or: [
      {username: identifier},
      {email: identifier}
    ]
  }).select('+password').exec()
}
