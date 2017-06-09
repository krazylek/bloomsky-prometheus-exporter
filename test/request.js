var bloomsky = require('../bloomsky-api')
var loadConf = require('../load-config')
var { config, argv } = loadConf(process.argv.slice(2))

var stream = bloomsky({ key: config.key, endpoint: config.endpoint })
stream.pipe(process.stdout)
stream.on('end', () => {
  if(argv.raw)
    return
  process.stdout.write('\n')
})
