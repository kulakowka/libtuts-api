'use strict'

const mongoose = require('../utils/mongoose')
const marked = require('../utils/marked')

const Schema = mongoose.Schema

const schema = new Schema({
  title: {
    type: String,
    trim: true,
    required: true,
    maxlength: 1000
  },
  slug: {
    type: String,
    lowercase: true,
    trim: true,
    maxlength: 1000
  },
  sourceUrl: {
    type: String,
    trim: true,
    maxlength: 2000
  },
  content: {
    type: String,
    trim: true,
    maxlength: 200000,
    select: false
  },
  contentHtml: {
    type: String
  },
  keywords: {
    type: [String],
    trim: true
  },
  languages: {
    type: [String]
  },
  creator: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  contributors: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }],
  platforms: {
    type: [String]
  },
  projects: [{
    name: String,
    platform: String
  }],
  commentsCount: {
    type: Number,
    default: 0
  }
}, {
  timestamps: {
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  }
})

// Добавим индекс для получения списка всех уроков на странице: /tutorials
schema.index({ createdAt: -1 })
schema.index({ projects: 1, createdAt: -1})
schema.index({ languages: 1, createdAt: -1})
schema.index({ platforms: 1, createdAt: -1})


schema.path('keywords').set(keywords => keywords.split(','))

schema.pre('save', function (next) {
  if (!this.isModified('content')) return next()
  this.contentHtml = marked(this.content)
  next()
})

module.exports = mongoose.model('Tutorial', schema)
