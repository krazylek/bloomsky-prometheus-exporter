var request = require('request')

var defaults = {
  uri: 'http://api.bloomsky.com/api/skydata/',
}

module.exports = function(options = {}, cb = undefined) {
  var intl = options.unit && options.unit == 'intl'
  var uri = (options.uri || defaults.uri).concat(intl ? '?unit=intl' : '')
  var headers = { 
    Authorization: options.apiKey
  }

  return request({
    method: 'GET',
    uri,
    headers
  }, cb)
}
