[Prometheus](https://prometheus.io/) exporter that expose [Bloomsky](https://www.bloomsky.com/) weather data.

The stations are identified by their ID and name.


## Getting started

Get your personnal key at http://dashboard.bloomsky.com/


## Install

Clone the repo, or install it on your system with npm:

```
npm install -g bloomsky-prometheus-exporter
```


## Usage 

### Standalone server

```
Usage: bloomsky-exporter [config file] {OPTIONS}

Standard Options:

       --port, -p  Select port for the metric server
                   default 9262

        --key, -k  Your Bloomsky api key
                   Get it on http://dashboard.bloomsky.com/

       --unit, -u  Set to "intl" if you prefer international units, "impl" for imperial
                   Default to imperial units

   --endpoint, -e  Optional parameter to override the bloomsky api endpoint.

       --help, -h  Show this message
```

Example (see below for bloomsky.yml config file):

```
bloomsky-exporter bloomsky.yml
```

### API

Exemple:

```
var getMetrics = require('./index.js')
getMetrics({ 
  key: 'Your Key',
  unit: 'intl'
}, function(err, metrics) {
  console.log(metrics)
})
```


## Configuration

You can use command line options, a yaml file or environment variables.
Options available are `key`, `port`, `unit` and eventually the Bloomsky API `endpoint`.
The only mandatory option is key, others have default values.

Priority is `command line args` > `yaml` > `env vars`.

### YAML

Minimal yml file:

```
key: <yourkey>
unit: intl
```

### ENV

You can define them in a .env file

```
BLOOMSKY_KEY=<yourkey>
BLOOMSKY_PORT=<port>
BLOOMSKY_UNIT=<intl|impl>
BLOOMSKY_ENDPOINT=<endpoint>
```


## Docker

Build (or wait for docker hub entry...)

```
docker build -t "krazylek/bloomsky-prometheus-exporter" https://github.com/krazylek/bloomsky-prometheus-exporter.git
```

Run

```
docker run -d -v $(pwd)/bloomsky.yml:/mnt/bloomsky.yml -p 9262:9262 --name bloomsky krazylek/bloomsky-prometheus-exporter
```

## Note

I am not affiliated with Bloomsky Inc in any way, and it is only a hobby project meant for personal use.

## License

[MIT](https://tldrlegal.com/license/mit-license])
