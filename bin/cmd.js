#!/usr/bin/env node

var http = require('http')
var fs = require('fs')
var bloomsky = require('../bloomsky-api')
var loadConf = require('../load-config')
var getMetrics = require('../')

var { config, argv } = loadConf(process.argv.slice(2))

if (argv.help) {
  return fs.createReadStream(__dirname + '/usage.txt')
    .pipe(process.stdout)
}

var server = http.createServer(function (req, res) {
  if (req.url === '/metrics') {
    getMetrics({ apiKey: config.key, uri: config.uri, unit: config.unit }, (err, metrics) => {
      if(err)
        return res.end(err)
      res.end(metrics)
    })
  }

  if (req.url === '/') {
    bloomsky({ apiKey: config.key, uri: config.uri, unit: config.unit })
      .pipe(res)
  }
})

var port = Number(config.port)
console.log(`listening on ${port}, metrics served on http://localhost:${port}/metrics`)
server.listen(port)

