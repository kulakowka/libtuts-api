'use strict'

// serializer
module.exports = function tutorialSerializer (item) {
  if (item._id) item.webUrl = `/tutorial/${item._id}`
  
  return item
}
