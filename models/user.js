'use strict'

var mongoose = require('../utils/mongoose')
var validate = require('mongoose-validator')
var bcrypt = require('bcrypt')

const SALT_WORK_FACTOR = 10

const Schema = mongoose.Schema

const schema = new Schema({
  username: {
    type: String,
    trim: true,
    required: true,
    maxlength: 20,
    minlength: 3,
    unique: true,
    index: true,
    validate: [
      validate({
        validator: 'isAlphanumeric',
        message: 'Username should contain alpha-numeric characters only'
      })
    ]
  },
  email: {
    type: String,
    trim: true,
    required: true,
    maxlength: 500,
    validate: [
      validate({
        validator: 'isEmail',
        message: 'Email should contain a valid Email address'
      })
    ]
  },
  emailConfirmed: {
    type: Boolean,
    default: false
  },
  password: {
    type: String,
    required: true,
    minlength: 7,
    select: false
  },
  fullName: {
    type: String,
    trim: true,
    maxlength: 200
  },
  commentsCount: {
    type: Number,
    default: 0
  },
  tutorialsCount: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
})

// Instance methods (user.comparePassword)
schema.methods.comparePassword = function comparePassword (candidatePassword, callback) {
  bcrypt.compare(candidatePassword, this.password, callback)
}

schema.virtual('webUrl').get(function () {
  return this.username && `/user/${this.username}`
})

schema.set('toJSON', { virtuals: true })

schema.path('username').validate((value, respond) => {
  User.count({username: value}, (_, count) => respond(!count))
}, 'Username is already taken')

schema.path('email').validate((value, respond) => {
  User.count({email: value}, (_, count) => respond(!count))
}, 'Email is already taken')

schema.pre('save', function (next) {
  if (!this.isModified('password')) return next()

  bcrypt.genSalt(SALT_WORK_FACTOR, (err, salt) => {
    if (err) return next(err)
    bcrypt.hash(this.password, salt, (err, hash) => {
      if (err) return next(err)
      this.password = hash
      next()
    })
  })
})

var User = mongoose.model('User', schema)

module.exports = User
