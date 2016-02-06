'use strict'

// serializer
module.exports = function languageSerializer (item) {
  let name = item.name
  if (name) item.webUrl = `/language/${name}`
  return item
}
