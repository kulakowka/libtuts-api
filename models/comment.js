'use strict'

const mongoose = require('../utils/mongoose')
const marked = require('../utils/marked')

const Schema = mongoose.Schema

const schema = new Schema({
  content: {
    type: String,
    maxlength: 200000,
    trim: true,
    required: true,
    select: false
  },
  contentHtml: {
    type: String
  },
  tutorial: {
    type: Schema.Types.ObjectId,
    ref: 'Tutorial'
  },
  creator: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
}, {
  timestamps: {
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  }
})

schema.index({ tutorial: 1, createdAt: -1})
 
module.exports = mongoose.model('Comment', schema)
