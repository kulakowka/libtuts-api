
const express = require('express')
const logger = require('morgan')
const bodyParser = require('body-parser')
const expressValidator = require('express-validator')
const validatorOptions = require('./utils/validatorOptions')

var pmx = require('pmx').init({
  custom_probes: true, // Auto expose JS Loop Latency and HTTP req/s as custom metrics
  network: true, // Network monitoring at the application level
  ports: true  // Shows which ports your app is listening on (default: false)
})

var app = express()

app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(expressValidator(validatorOptions))

app.use('/', require('./routes/index'))

// catch 404 and forward to error handler
app.use((req, res, next) => {
  var err = new Error('Not Found')
  err.status = 404
  next(err)
})

app.use((error, req, res, next) => {
  res.status(error.status || 500)
  res.json({error, errors: error.errors})
  // console.log(err.stack)
})

module.exports = app
