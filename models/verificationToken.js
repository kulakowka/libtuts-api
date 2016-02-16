'use strict'

var uuid = require('node-uuid')
var mongoose = require('../utils/mongoose')

var Schema = mongoose.Schema
var schema = Schema({
  user: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  token: {
    type: String,
    required: true,
    index: true,
    default: () => uuid.v4()
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: '24h'         // Verification token expires after 24 hours
  }
})

module.exports = mongoose.model('VerificationToken', schema)
