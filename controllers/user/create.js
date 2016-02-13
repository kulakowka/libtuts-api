'use strict'

const api = require('../../utils/api')

module.exports = (req, res) => {
  req.checkBody({
    username: {
      isUsernameAvailable: {
        errorMessage: 'Username is already taken'
      },
      isAlphanumeric: {
        errorMessage: 'Username may only contain alphanumeric characters'
      },
      isLength: {
        options: [{ min: 3, max: 20 }],
        errorMessage: 'Username must be between 3 and 20 chars long'
      },
      notEmpty: true,
      errorMessage: 'Username can\'t be blank'
    },
    email: {
      isEmailAvailable: {
        errorMessage: 'Email is already taken'
      },
      isEmail: {
        errorMessage: 'Invalid Email'
      },
      notEmpty: true,
      errorMessage: 'Email can\'t be blank'
    },
    password: {
      isLength: {
        options: [{ min: 7 }],
        errorMessage: 'Password can\'t be blank and is too short (minimum is 7 characters)'
      },
      notEmpty: true,
      errorMessage: 'Password can\'t be blank' // Error message for the parameter
    }
  })
  return req.asyncValidationErrors(true)
    .then(() => api.create('user', req))
    .catch(errors => ({errors}))
}
