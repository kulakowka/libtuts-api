const express = require('express')
const logger = require('morgan')
const bodyParser = require('body-parser')

var app = express()

app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use('/', require('./routes/index'))

// catch 404 and forward to error handler
app.use((req, res, next) => {
  var err = new Error('Not Found')
  err.status = 404
  next(err)
})

app.use((err, req, res, next) => {
  res.status(err.status || 500)
  res.json({
    error: {
      message: err.message
    }
  })
  // console.log(err.stack)
})

module.exports = app
