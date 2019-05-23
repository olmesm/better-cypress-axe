function isEmptyObjectorNull (value) {
  if (value == null) { return true }
  return Object.entries(value).length === 0 && value.constructor === Object
}

exports.isEmptyObjectorNull = isEmptyObjectorNull
