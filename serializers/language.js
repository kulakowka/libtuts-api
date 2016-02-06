'use strict'

// serializer
module.exports = function languageSerializer (item) {
  return Object.assign(item, {
    webUrl: `/language/${item.name.toLowerCase()}`
  })
}
