require('dotenv').config()
var fs = require('fs')
var yaml = require('js-yaml');
var defaults = {
  port: 9262,
  unit: 'impl',
}

module.exports = load
module.exports.parseFile = parseFile

function load(argv = {}) {
  var configFilepath = (argv._ && argv._[0]) || 'bloomsky.yml'
  var fileConfig = parseFile(configFilepath)

  return {
    key: argv.key || fileConfig.key || process.env.BLOOMSKY_KEY,
    port: argv.port || fileConfig.port || process.env.BLOOMSKY_PORT ||  defaults.port,
    unit: argv.unit || fileConfig.unit || process.env.BLOOMSKY_UNIT || defaults.unit,
    endpoint: argv.endpoint || fileConfig.endpoint|| process.env.BLOOMSKY_ENDPOINT,
  }
}

function parseFile(filepath) {
  if(!fs.existsSync(filepath))
    return console.error('Continuing without config file')

  return yaml.safeLoad(fs.readFileSync(filepath, 'utf8'))
}
