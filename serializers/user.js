'use strict'

// serializer
module.exports = function userSerializer (item) {
  item.webUrl = `/user/${item.username}`
  return item
}
