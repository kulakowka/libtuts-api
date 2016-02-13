'use strict'

const mongoose = require('../utils/mongoose')

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
  sourceDomain: {
    type: String
  },
  content: {
    type: String,
    trim: true,
    select: false,
    maxlength: 200000
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
    required: true,
    ref: 'User'
  },
  contributors: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }],
  platforms: {
    type: [String]
  },
  projects: {
    type: [String]
  },
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

schema.virtual('webUrl').get(function () {
  return this._id && `/tutorial/${this._id}`
})

schema.set('toJSON', { virtuals: true })

// Добавим индекс для получения списка всех уроков на странице: /tutorials
schema.index({createdAt: -1})
schema.index({projects: 1, createdAt: -1})
schema.index({languages: 1, createdAt: -1})
schema.index({platforms: 1, createdAt: -1})

module.exports = mongoose.model('Tutorial', schema)
