'use strict'

// serializer
module.exports = function projectSerializer (item) {
  return Object.assign(item, {
    // TODO: fix apiUrl
    apiUrl: item.slug ? `/project/:platform/${item.slug}` : undefined
  })
}
