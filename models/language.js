'use strict'

const mongoose = require('../utils/mongoose')

const Schema = mongoose.Schema

const schema = new Schema({
  name: {
    type: String,
    required: true
  },
  slug: {
    type: String,
    lowercase: true,
    trim: true,
    maxlength: 200
  },
  tutorialsCount: {
    type: Number,
    default: 0
  },
  projectsCount: {
    type: Number,
    default: 0
  }
})

module.exports = mongoose.model('Language', schema)
