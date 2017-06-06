Basic exporter that expose [Bloomsky](https://www.bloomsky.com/) data to [Prometheus](https://prometheus.io/) through a metrics server

## Install

Clone repo, or try installing it with npm:

```
npm install -g https://github.com/krazylek/bloomsky-prometheus-exporter
```

## Usage 

### Standalone server

```
Usage: bloomsky-exporter [config file] {OPTIONS}

Standard Options:

       --port, -p  Select port for the metric server
                   default 9099

        --key, -k  Your Bloomsky api key
                   Get it on http://dashboard.bloomsky.com/

       --unit, -u  Set to "intl" if you prefer international units, "impl" for imperial
                   Default to imperial units

       --help, -h  Show this message
```

Example:

```
node bin/cmd.js bloomsky.yml -p 9999
```

or 

```
bloomsky-exporter bloomsky.yml -p 9999
```

### API

Exemple:

```
var getMetrics = require('./index.js')
getMetrics({ 
  apiKey: 'Your Key',
  unit: 'intl'
}, function(err, metrics) {
  console.log(metrics)
})
```

There is an optional uri parameter to overide the bloomsky api endpoint


## Configuration

You can use either command line options or yml file

### YAML

Minimal yml file:

```
key: <yourkey>
unit: intl
```

## License

[MIT](https://tldrlegal.com/license/mit-license])
