var bloomsky = require('./bloomsky-api')
var exporter = require('./exporter')

module.exports = function({ key, unit, endpoint }, cb) {
  bloomsky({ key, unit, endpoint }, (err, httpResponse, body) => {
    if(err)
      return cb(err)
    if(httpResponse.statusCode != 200)
      return cb(body)

    var data = JSON.parse(body)
    var metrics = exporter(data, unit)
    cb(null, metrics)
  })
}
