'use strict'

const mongoose = require('../utils/mongoose')

const Schema = mongoose.Schema

const schema = new Schema({
  name: {
    type: String,
    trim: true,
    required: true,
    maxlength: 200
  },
  slug: {
    type: String,
    lowercase: true,
    trim: true,
    maxlength: 200,
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
    trim: true,
    index: true
  },
  language: {
    type: Schema.Types.ObjectId,
    ref: 'Language'
  },
  platform: {
    type: Schema.Types.ObjectId,
    ref: 'Platform'
  },
  tutorialsCount: {
    type: Number,
    default: 0
  },
  tutorials: [{
    type: Schema.Types.ObjectId,
    ref: 'Tutorial'
  }]
}, {
  timestamps: {
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  }
})

module.exports = mongoose.model('Project', schema)
