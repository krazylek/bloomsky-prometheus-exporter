var test = require('tape')
var loadConfig = require('../load-config')

test('parsing a yaml file is ok', function (t) {
  t.plan(1)
  var filepath = './test/testconf.yml'
  var expectedConfig = {
    key: 'keytest',
    port: 9999,
    unit: 'intl',
    endpoint: 'bloomsky-api.endpoint'
  }
  var config = loadConfig.parseFile(filepath)
  t.deepEqual(config, expectedConfig)
})

test('giving parameters will change config', function (t) {
  t.plan(2)
  var args = [
    '--help',
    '--key', 'keytest',
    '--port', '9999',
    '--unit', 'intl',
    '--endpoint', 'bloomsky-api.endpoint'
  ]
  var expectedConfig = {
    key: 'keytest',
    port: 9999,
    unit: 'intl',
    endpoint: 'bloomsky-api.endpoint'
  }
  var { config, argv } = loadConfig(args)
  t.deepEqual(config, expectedConfig)
  t.equal(argv.help, true)
})

test('no parameters will give default config', function (t) {
  t.plan(2)
  var args = []
  var expectedConfig = {
    key: undefined,
    port: 9262,
    unit: 'impl',
    endpoint: undefined
  }
  var { config, argv } = loadConfig(args)
  t.deepEqual(config, expectedConfig)
  t.false(argv.help)
})

test('giving a filename will load config', function (t) {
  t.plan(2)
  var args = [
    './test/testconf.yml',
    '--help'
  ]
  var expectedConfig = {
    key: 'keytest',
    port: 9999,
    unit: 'intl',
    endpoint: 'bloomsky-api.endpoint'
  }
  var { config, argv } = loadConfig(args)
  t.deepEqual(config, expectedConfig)
  t.equal(argv.help, true)
})

test('giving a filename will load config, but cli params take over', function (t) {
  t.plan(2)
  var args = [
    './test/testconf.yml',
    '--help',
    '--key', 'keytestP',
    '--port', '99990',
    '--unit', 'intl',
    '--endpoint', 'bloomsky-api.endpointP'
  ]
  var expectedConfig = {
    key: 'keytestP',
    port: 99990,
    unit: 'intl',
    endpoint: 'bloomsky-api.endpointP'
  }
  var { config, argv } = loadConfig(args)
  t.deepEqual(config, expectedConfig)
  t.equal(argv.help, true)
})

