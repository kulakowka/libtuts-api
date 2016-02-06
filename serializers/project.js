'use strict'

// serializer
module.exports = function projectSerializer (item) {
  const platform = item.platform
  const name = item.name

  if (platform && name) item.webUrl = `/${platform}/${name}`
  return item
}
