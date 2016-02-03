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
  content: {
    type: String,
    trim: true,
    maxlength: 200000
  },
  keywords: {
    type: [String],
    trim: true,
    index: true
  },
  languages: [{
    type: Schema.Types.ObjectId,
    ref: 'Language'
  }],
  creator: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  contributors: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }],
  platforms: [{
    type: Schema.Types.ObjectId,
    ref: 'Platform'
  }],
  projects: [{
    type: Schema.Types.ObjectId,
    ref: 'Project'
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

module.exports = mongoose.model('Tutorial', schema)
