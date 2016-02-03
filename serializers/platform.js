'use strict'

// serializer
module.exports = function platformSerializer (item) {
  return Object.assign(item, {
    apiUrl: item.slug ? `/platform/${item.slug}` : undefined
  })
}
