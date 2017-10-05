// tests needs bloomsky key to be set with .env file or env variable: BLOOMSKY_KEY=your_secret_key
 
var test = require('tape')
var getMetrics = require('../')
var config = require('../load-config')()

test('valid key request will return valid metrics result', function (t) {
  t.plan(2)
  getMetrics({ key: config.key }, (err, metrics) => {
    t.notok(err)
    t.ok(metrics.match(/weather_measurement_epoch{id=".*",name=".*"} \d+/g))
  })
})
