'use strict'

// serializer
module.exports = function languageSerializer (item) {
  return Object.assign(item, {
    apiUrl: item.slug ? `/language/${item.slug}` : undefined
  })
}
