'use strict'

const mongoose = require('../utils/mongoose')

const Schema = mongoose.Schema

const schema = new Schema({
  name: {
    type: String,
    lowercase: true,
    required: true,
    maxlength: 50,
    trim: true
  },
  tutorialsCount: {
    type: Number,
    default: 0
  }
})

schema.set('toJSON', { virtuals: true })

module.exports = mongoose.model('Keyword', schema)
