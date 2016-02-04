'use strict'

const requireDir = require('require-dir')
const serializers = requireDir('../serializers', {recurse: true})

const api = {
  find (model, req) {
    const modelName = model.modelName.toLowerCase()
    const query = req.query
    const limit = query.limit || 30
    const where = query.where ? JSON.parse(query.where) : {}
    const select = query.select ? query.select.split(',').join(' ') : ''
    const skip = query.skip || 0
    const sort = query.sort ? query.sort.split(',').join(' ') : ''
    const populate = query.populate ? query.populate.split(',').join(' ') : ''
    return model.find()
    .where(where)
    .select(select)
    .limit(limit)
    .skip(skip)
    .sort(sort)
    .populate(populate)
    .exec()
    .then(items => {
      return items.map(item => serializers[modelName](item.toJSON()))
    })
  },

  findOne (model, req) {
    const query = req.query
    const params = req.params
    const select = query.select ? query.select.split(',').join(' ') : ''
    const populate = query.populate ? query.populate.split(',').join(' ') : ''
    return model.findOne(params)
    .populate(populate)
    .select(select)
    .exec()
  }
}

module.exports = api
