'use strict'

const mongoose = require('../utils/mongoose')

const Schema = mongoose.Schema

const schema = new Schema({
  name: {
    type: String,
    lowercase: true,
    required: true,
    trim: true,
    unique: true
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

// Добавим индекс для получения списка всех платформ на странице: /platforms
schema.index({ projectsCount: -1 })

module.exports = mongoose.model('Platform', schema)
