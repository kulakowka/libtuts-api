'use strict'

const api = require('../../utils/api')

module.exports = (req, res) => api.find('user', req)
