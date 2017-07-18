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
    getMetrics(getBloomskyOptions(config), (err, metrics) => {
      if(err) {
        console.error('error while requesting Bloomsky API', err)
        res.statusCode = 500        
        return res.end(err.toString)
      }
      res.end(metrics)
    })
  }

  if (req.url === '/') {
    bloomsky(getBloomskyOptions(config))
      .pipe(res)
  }
})

function getBloomskyOptions({ key, unit, endpoint }) {
  return { key, unit, endpoint }
}

var port = Number(config.port)
console.log(`listening on ${port}, metrics served on http://localhost:${port}/metrics`)
server.listen(port)

