var test = require('tape')
var loadConfig = require('../load-config')
var minimist = require('minimist')

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
  var argv = minimist(args)
  var expectedConfig = {
    key: 'keytest',
    port: 9999,
    unit: 'intl',
    endpoint: 'bloomsky-api.endpoint'
  }
  var config = loadConfig(argv)
  t.deepEqual(config, expectedConfig)
  t.equal(argv.help, true)
})

test('giving a filename will load this file config', function (t) {
  t.plan(1)
  var argv = {
    _: ['./test/testconf.yml'],
  }
  var expectedConfig = {
    key: 'keytest',
    port: 9999,
    unit: 'intl',
    endpoint: 'bloomsky-api.endpoint'
  }
  var config = loadConfig(argv)
  t.deepEqual(config, expectedConfig)
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
  var argv = minimist(args)
  var expectedConfig = {
    key: 'keytestP',
    port: 99990,
    unit: 'intl',
    endpoint: 'bloomsky-api.endpointP'
  }
  var config = loadConfig(argv)
  t.deepEqual(config, expectedConfig)
  t.equal(argv.help, true)
})

