var fs = require('fs')
var minimist = require('minimist')
var yaml = require('yaml')

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
    },
    'default': {
      port: 9261,
      unit: 'impl',
    }
  })
  var config = Object.assign({}, parseFile(argv._[0]), argv)

  return { config, argv }
}

function parseFile(filepath) {
  if(! filepath)
    return console.error('Continuing without config file')

  return yaml.eval(fs.readFileSync(filepath, 'utf8'))
}
