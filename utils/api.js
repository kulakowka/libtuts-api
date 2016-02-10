'use strict'

const requireDir = require('require-dir')
const serializers = requireDir('../serializers', {recurse: true})
const models = require('require-dir')('../models', {recurse: true})

const api = {
  find (model, req) {
    let query = req.query
    let q = models[model].find()
    if (query.where) q.where(req.query.where)
    if (query.populate) query.populate.forEach(field => q.populate(field))
    if (query.select) query.select.forEach(field => q.select(field))
    if (query.sort) q.sort(query.sort)
    if (query.limit) q.limit(query.limit)
    if (query.skip) q.limit(query.skip)
    return q.exec().then(items => items.map(serialize(model)))
  },

  findOne (model, req) {
    let query = req.query
    let q = models[model].findOne()
    if (query.where) q.where(req.query.where)
    if (query.populate) query.populate.forEach(field => q.populate(field))
    if (query.select) query.select.forEach(field => q.select(field))
    return q.exec().then(serialize(model))
  },

  create (model, req) {
    let q = models[model].create(req.body)
    return q.then(serialize(model))
  },

  update (model, req) {
    let q = models[model].findOneAndUpdate(req.query.where, req.body, {new: true})
    return q.then(serialize(model))
  },

  delete (model, req) {
    let q = models[model].findOneAndRemove(req.query.where)
    return q.then(serialize(model))
  }
}

function serialize (model) {
  return (item) => item && serializers[model](item.toJSON())
}
module.exports = api
