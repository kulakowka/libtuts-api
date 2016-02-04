'use strict'

// serializer
module.exports = function tutorialSerializer (item) {
  return Object.assign(item, {
    apiUrl: item.id ? `/tutorial/${item.id}` : undefined
  })
}
