'use strict'

// serializer
module.exports = function tutorialSerializer (item) {
  return Object.assign(item, {
    webUrl: `/tutorial/${item.id}`
  })
}
