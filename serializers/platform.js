'use strict'

// serializer
module.exports = function platformSerializer (item) {
  let name = item.name
  if (name) item.webUrl = `/${name}`
  return item
}
