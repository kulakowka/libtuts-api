'use strict'

const mongoose = require('../utils/mongoose')

const Schema = mongoose.Schema

const schema = new Schema({
  name: {
    type: String,
    lowercase: true,
    required: true,
    trim: true,
    index: true,
    maxlength: 100
  },
  language: {
    type: String,
    required: true,
    lowercase: true,
    trim: true,
    index: true
  },
  platform: {
    type: String,
    lowercase: true,
    required: true,
    trim: true,
    index: true
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
    // index: true
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

schema.index({ name: 1, platform: 1 }, { unique: true })

schema.path('keywords').set(keywords => {
  if (typeof keywords === String) return keywords.split(',')
  return keywords
})

module.exports = mongoose.model('Project', schema)
