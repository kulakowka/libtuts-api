'use strict'

const mongoose = require('../utils/mongoose')

const Schema = mongoose.Schema

const schema = new Schema({
  content: {
    type: String,
    required: true
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

module.exports = mongoose.model('Comment', schema)
