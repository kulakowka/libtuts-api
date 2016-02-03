'use strict'

const mongoose = require('../utils/mongoose')

const Schema = mongoose.Schema

const schema = new Schema({
  username: {
    type: String,
    trim: true,
    required: true,
    maxlength: 100,
    minLength: 3
  },
  email: {
    type: String,
    trim: true,
    required: true,
    maxlength: 500
  },
  password: {
    type: String,
    required: true
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

module.exports = mongoose.model('User', schema)
