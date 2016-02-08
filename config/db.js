'use strict'

module.exports = {
  uri: process.env.MONGO_URL || 'mongodb://localhost/libtuts_prototype_api_v1',
  options: {
    // возможно это и не так нужно, но поцаны люто рекомендуют, поэтому мож и надо оставить,
    // а индексы на продакшине вручную делать (надо тогда будет подготовить команды для создания индексов)
    autoIndex: process.env.NODE_ENV !== 'production'
  }
}
