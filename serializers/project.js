'use strict'

// serializer
module.exports = function projectSerializer (item) {  
  const platform = item.platform.toLowerCase()
  return Object.assign(item, {
    webUrl: `/${platform}/${item.slug}`
  })
}
