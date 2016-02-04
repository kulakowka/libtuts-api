'use strict'

// serializer
module.exports = function commentSerializer (item) {
  return Object.assign(item, {
    // apiUrl: item.slug ? `/language/${item.slug}` : undefined
  })
}
