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

schema.virtual('webUrl').get(function () {
  return this.name && `/language/${this.name}`
})

schema.set('toJSON', { virtuals: true })

// Добавим индекс для получения списка всех языков на странице: /languages
schema.index({ projectsCount: -1 })


module.exports = mongoose.model('Language', schema)
