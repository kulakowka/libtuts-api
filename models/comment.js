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

schema.pre('save', function (next) {
  if (!this.isModified('content')) return next()
  this.contentHtml = marked(this.content)
  next()
})

module.exports = mongoose.model('Comment', schema)
