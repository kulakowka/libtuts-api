'use strict'

const mongoose = require('../utils/mongoose')

const Schema = mongoose.Schema

const schema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    index: true,
    maxlength: 100
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
    trim: true,
    index: true
  },
  language: {
    type: String,
    trim: true,
    index: true
  },
  platform: {
    type: String,
    trim: true,
    index: true
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
  }
}, {
  timestamps: {
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  }
})

schema.pre('save', function (next) {
  this.keywords = this.keywords.split(',')
  next()
})

module.exports = mongoose.model('Project', schema)
