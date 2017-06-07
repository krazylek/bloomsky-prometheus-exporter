Basic exporter that expose [Bloomsky](https://www.bloomsky.com/) data to [Prometheus](https://prometheus.io/) through a metrics server

If you own many stations, they should be identified by their ID and name.


## Getting started

Get your personnal key at http://dashboard.bloomsky.com/



## Install

Clone the repo, or install it with npm:

```
npm install -g bloomsky-prometheus-exporter
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
node bin/server.js bloomsky.yml -p 9099
```

If installed: 

```
bloomsky-exporter bloomsky.yml -p 9099
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

## Docker

Build (or wait for docker hub entry...)

```
docker build -t "krazylek/bloomsky-prometheus-exporter" .
```

Run

```
docker run -d -v $(pwd)/bloomsky.yml:/mnt/bloomsky.yml -p 9099:9099 --name bloomsky krazylek/bloomsky-prometheus-exporter
```

## License

[MIT](https://tldrlegal.com/license/mit-license])
