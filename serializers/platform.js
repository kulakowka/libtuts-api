'use strict'

// serializer
module.exports = function platformSerializer (item) {
  return Object.assign(item, {
    webUrl: `/${item.name.toLowerCase()}`
  })
}
