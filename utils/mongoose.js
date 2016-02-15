'use strict'

const debug = require('debug')('app:db')
const mongoose = require('mongoose')
const config = require('../config/db')

mongoose.Promise = global.Promise

mongoose.Error.messages.general.required = '{PATH} can\'t be blank'

mongoose.Error.messages.String.minlength = '{PATH} is shorter than the minimum allowed length ({MINLENGTH})'
mongoose.Error.messages.String.maxlength = '{PATH} is longer than the maximum allowed length ({MAXLENGTH})'

mongoose.connect(config.uri, config.options, () => debug('Mongo connected'))

module.exports = mongoose
