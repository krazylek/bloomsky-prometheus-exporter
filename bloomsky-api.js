var request = require('request')

var defaults = {
  endpoint: 'http://api.bloomsky.com/api/skydata/',
}

/**
 * Returns a stream from bloomsky api endpoint
 *
 * options: object {
 *   key: string,
 *   unit: string,
 *   endpoint: string
 * }
 * cb: function(err, httpResponse, body), optional callback
 */
module.exports = function(options = {}, cb = undefined) {
  var intl = options.unit && options.unit == 'intl'
  var uri = (options.endpoint || defaults.endpoint).concat(intl ? '?unit=intl' : '')
  var headers = { 
    Authorization: options.key
  }

  return request({
    method: 'GET',
    uri,
    headers
  }, cb)
}
