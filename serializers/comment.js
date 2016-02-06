'use strict'

// serializer
module.exports = function commentSerializer (item) {
  let tutorial = item.tutorial
  let _id = item._id
  if (tutorial && _id) item.webUrl = `/tutorial/${tutorial}#comment_${_id}`
  return item
}
