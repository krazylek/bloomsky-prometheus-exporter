var fs = require('fs')
var minimist = require('minimist')
var yaml = require('js-yaml');
var defaults = {
  port: 9262,
  unit: 'impl',
}

module.exports = load
module.exports.parseFile = parseFile

function load(args) {
  var argv = minimist(args, {
    alias: { 
      h: 'help',
      k: 'key',
      p: 'port',
      u: 'unit',
      e: 'endpoint',
    }
  })
  var fileConfig = Object.assign({}, parseFile(argv._[0]))

  var config = {
    key: argv.key || fileConfig.key,
    port: argv.port || fileConfig.port || defaults.port,
    unit: argv.unit || fileConfig.unit || defaults.unit,
    endpoint: argv.endpoint || fileConfig.endpoint,
  }

  return { config, argv }
}

function parseFile(filepath) {
  if(! filepath)
    return console.error('Continuing without config file')

  //return yaml.eval(fs.readFileSync(filepath, 'utf8'))
  return yaml.safeLoad(fs.readFileSync(filepath, 'utf8'))
}
