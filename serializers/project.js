'use strict'

// serializer
module.exports = function projectSerializer (item) {
  const platform = item.platform.toLowerCase()
  const name = item.name.toLowerCase()
  return Object.assign(item, {
    webUrl: `/${platform}/${name}`
  })
}
