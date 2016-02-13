'use strict'

const mongoose = require('../utils/mongoose')

const Schema = mongoose.Schema

const schema = new Schema({
  username: {
    type: String,
    trim: true,
    required: true,
    maxlength: 20,
    minLength: 3,
    unique: true,
    index: true
  },
  email: {
    type: String,
    trim: true,
    required: true,
    maxlength: 500
  },
  password: {
    type: String,
    required: true,
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
  timestamps: {
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  }
})

schema.virtual('webUrl').get(function () {
  return this.username && `/user/${this.username}`
})

schema.set('toJSON', { virtuals: true })

schema.pre('save', function (next) {
  if (!this.isModified('username')) return next()
  this.fullName = this.fullName || this.username
  next()
})

module.exports = mongoose.model('User', schema)
