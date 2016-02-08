'use strict'

const mongoose = require('../utils/mongoose')

const Schema = mongoose.Schema

const schema = new Schema({
  name: {
    type: String,
    lowercase: true,
    required: true,
    trim: true,
    maxlength: 100
  },
  language: {
    type: String,
    required: true,
    lowercase: true,
    trim: true
  },
  platform: {
    type: String,
    lowercase: true,
    required: true,
    trim: true
  },
  homepageUrl: {
    type: String,
    trim: true,
    maxlength: 2000
  },
  repositoryUrl: {
    type: String,
    trim: true,
    maxlength: 2000
  },
  packageManagerUrl: {
    type: String,
    trim: true,
    maxlength: 2000
  },
  description: {
    type: String,
    trim: true,
    maxlength: 2000
  },
  keywords: {
    type: [String],
    lowercase: true,
    trim: true
  },
  tutorialsCount: {
    type: Number,
    default: 0
  },
  stars: {
    type: Number,
    default: 0
  },
  rank: {
    type: Number,
    default: 0
  },
  isLoaded: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: {
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  }
})

// Добавим индекс для получения списка всех проектов на странице: /projects
schema.index({ rank: -1 })

// Добавим уникальный индекс, чтобы нельзя было добавить два проекта с одинаковыми name и platform
schema.index({ name: 1, platform: 1 }, {unique: true})

schema.index({ language: 1, rank: -1})
schema.index({ platform: 1, rank: -1})


schema.path('keywords').set(keywords => {
  if (typeof keywords === String) return keywords.split(',')
  return keywords
})

schema.pre('save', function (next) {
  // if (this.keywords.length) return next()
  // if (this.platforms) this.keywords = this.keywords.concat(this.platforms, this.languages)
  // if (this.languages)
  next()
})

module.exports = mongoose.model('Project', schema)
