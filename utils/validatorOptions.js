'use strict'

const models = require('require-dir')('../models', {recurse: true})

module.exports = {
  customValidators: {
    isUsernameAvailable: (username) => {
      return models.user.count({username}).exec().then(count => {
        return count > 0 && Promise.reject('Username is already taken')
      })
      // return new Promise((resolve, reject) => {
      //   if (username === 'admin') return reject('error')
      //   return resolve('ok')
      // })
    },
    isEmailAvailable: (email) => {
      return models.user.count({email}).exec().then(count => {
        return count > 0 && Promise.reject('Email is invalid or already taken')
      })
      // return new Promise((resolve, reject) => {
      //   if (username === 'admin') return reject('error')
      //   return resolve('ok')
      // })
    }
  }
}
