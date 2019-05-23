const { isEmptyObjectorNull } = require('./isEmptyObjectorNull')

function configureAxe (context, options) {
  return _window => {
    if (isEmptyObjectorNull(context)) { context = undefined }
    if (isEmptyObjectorNull(options)) { options = undefined }

    return _window.axe.run(context || _window.document, options)
  }
}

exports.configureAxe = configureAxe
