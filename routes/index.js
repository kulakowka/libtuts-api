'use strict'

const requireDir = require('require-dir')
const router = require('express').Router()

const c = requireDir('../controllers', {recurse: true})

router
.get('/platform', c.platform.index)
.get('/platform/:slug', c.platform.show)

.get('/language', c.language.index)
.get('/language/:slug', c.language.show)

.get('/project', c.project.index)
.get('/project/:platform/:slug', c.project.show)

module.exports = router
