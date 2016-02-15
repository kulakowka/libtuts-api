'use strict'

const mongoose = require('../utils/mongoose')
const validate = require('mongoose-validator')

const Schema = mongoose.Schema

const schema = new Schema({
  title: {
    type: String,
    trim: true,
    required: true,
    minlength: 5,
    maxlength: 200
  },
  slug: {
    type: String,
    lowercase: true,
    trim: true
  },
  sourceUrl: {
    type: String,
    trim: true,
    maxlength: 2000,
    validate: [
      validate({
        validator: 'isURL',
        passIfEmpty: true,
        message: 'Source URL should contain a valid URL address'
      })
    ]
  },
  sourceDomain: {
    type: String
  },
  content: {
    type: String,
    trim: true,
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
  timestamps: true
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
