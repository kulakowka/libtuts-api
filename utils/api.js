'use strict'

const requireDir = require('require-dir')
const serializers = requireDir('../serializers', {recurse: true})

const api = {
  find (model, req) {
    let modelName = model.modelName.toLowerCase()
    let query = req.query
    let limit = query.limit || 30
    let where = {}
    try {
      where = query.where ? JSON.parse(query.where) : {}
    } catch (err) {}
    let select = query.select ? query.select.split(',').join(' ') : ''
    let skip = query.skip || 0
    let sort = query.sort || ''
    let populate = query.populate ? query.populate.split(',').join(' ') : ''
    try {
      sort = JSON.parse(sort)
    } catch (err) {}
    return model.find()
    .where(where)
    .select(select)
    .limit(limit)
    .skip(skip)
    .sort(sort)
    .populate(populate)
    .exec()
    .then(items => items.map(item => serializers[modelName](item.toJSON())))
  },

  findOne (model, req) {
    let modelName = model.modelName.toLowerCase()
    let query = req.query
    let where = query.where ? JSON.parse(query.where) : {}
    let select = query.select ? query.select.split(',').join(' ') : ''
    let populate = query.populate ? query.populate.split(',').join(' ') : ''

    return model.findOne(where)
    .select(select)
    .populate(populate)
    .exec()
    .then(item => item && serializers[modelName](item.toJSON()))
  },

  create (model, req) {
    let modelName = model.modelName.toLowerCase()
    let body = req.body
    return model.create(body)
    .then(item => item && serializers[modelName](item.toJSON()))
  }
}

module.exports = api
