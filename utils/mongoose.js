'use strict'

const debug = require('debug')('app:db')
const mongoose = require('mongoose')
const config = require('../config/db')

mongoose.Promise = global.Promise

mongoose.connect(config.uri, config.options, () => debug('Mongo connected'))

module.exports = mongoose
