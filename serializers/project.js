'use strict'

// serializer
module.exports = function platformSerializer (item) {
  return Object.assign(item, {
    apiUrl: item.slug ? `/project/:platform/${item.slug}` : undefined
  })
}
