'use strict'

const mongoose = require('../utils/mongoose')

const Schema = mongoose.Schema

const schema = new Schema({
  name: {
    type: String,
    lowercase: true,
    required: true,
    trim: true,
    unique: true,
    index: true
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

module.exports = mongoose.model('Platform', schema)
