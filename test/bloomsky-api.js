// tests needs bloomsky key to be set with .env file or env variable: BLOOMSKY_KEY=your_secret_key
 
var test = require('tape')
var api = require('../bloomsky-api')

test('no key request will return error message', function (t) {
  t.plan(2)
  api({}, (err, resp, body) => {
    t.notok(err)
    t.deepEqual(JSON.parse(body), {"detail":"No API key is provided"})
  })
})

test('invalid key request will return error result', function (t) {
  t.plan(2)
  api({ key: 'invalid' }, (err, resp, body) => {
    t.notok(err)
    t.deepEqual(JSON.parse(body), {"detail":"user does not exist"})
  })
})

test('valid key request will return valid json result', function (t) {
  t.plan(4)
  var config = require('../load-config')()
  api({ key: config.key }, (err, resp, body) => {
    t.notok(err)
    var result = JSON.parse(body)
    t.ok(Array.isArray(result))
    t.ok(result[0].UTC)
    t.ok(result[0].Data)
  })
})
