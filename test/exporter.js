var exporter = require('../exporter')
var test = require('tape')

test('converts request result to metrics', function (t) {
  t.plan(2)
  var successfullRequest = [{"UTC":2,"CityName":"city XY","Storm":{},"Searchable":false,"DeviceName":"Device-name-XY","RegisterTime":1438000000,"DST":1,"BoundedPoint":"","LON":6.60,"Point":{},"VideoList":["1.mp4", "2.mp4"],"VideoList_C":["3.mp4","4.mp4"],"DeviceID":"XYZ","NumOfFollowers":20,"LAT":50.50,"ALT":240.0,"Data":{"Luminance":22,"Temperature":9.20,"ImageURL":"1.jpg","TS":1507157800,"Rain":false,"Humidity":99,"Pressure":991,"DeviceType":"SKY1","Voltage":2570,"Night":false,"UVIndex":"1","ImageTS":1507122000},"FullAddress":"full-address-XY","StreetName":"street-name-XY","PreviewImageList":["2jpg","3.jpg","4.jpg","5.jpg","6.jpg"]}]
  var metrics = exporter(successfullRequest, 'intl')
  t.equal(typeof metrics, 'string')
  t.ok(metrics.match(/weather_temperature_celsius{id="XYZ",name="Device-name-XY"} 9.2/g))
})

test('Temperature is matched', function (t) {
  t.plan(2)
  var responsePart = [{ DeviceID:'XYZ', DeviceName: 'Device-Name-XY', Data: { Temperature: 5.1 }}]
  var metricsIntl = exporter(responsePart, 'intl')
  var metricsImpl = exporter(responsePart, '')
  t.ok(metricsIntl.match(/weather_temperature_celsius{id="XYZ",name="Device-Name-XY"} 5.1/g))
  t.ok(metricsImpl.match(/weather_temperature_fahrenheit{id="XYZ",name="Device-Name-XY"} 5.1/g))
})

test('Pressure is matched', function (t) {
  t.plan(2)
  var responsePart = [{ DeviceID:'XYZ', DeviceName: 'Device-Name-XY', Data: { Pressure: 981 }}]
  var metricsIntl = exporter(responsePart, 'intl')
  var metricsImpl = exporter(responsePart, '')
  t.ok(metricsIntl.match(/weather_pressure_hectopascal{id="XYZ",name="Device-Name-XY"} 981/g))
  t.ok(metricsImpl.match(/weather_pressure_inhg{id="XYZ",name="Device-Name-XY"} 981/g))
})

test('TS is matched', function (t) {
  t.plan(1)
  var responsePart = [{ DeviceID:'XYZ', DeviceName: 'Device-Name-XY', Data: { TS: 1438200000 }}]
  var metrics = exporter(responsePart, 'intl')
  t.ok(metrics.match(/weather_measurement_epoch{id="XYZ",name="Device-Name-XY"} 1438200000/g))
})

test('LAT/LON are matched', function (t) {
  t.plan(2)
  var responsePart = [{ DeviceID:'XYZ', DeviceName: 'Device-Name-XY', Data: {}, LAT: 5.55, LON: 6.16 }]
  var metrics = exporter(responsePart, 'intl')
  t.ok(metrics.match(/weather_location_coordinates{dimension="latitude"} 5.55/g))
  t.ok(metrics.match(/weather_location_coordinates{dimension="longitude"} 6.16/g))
})

test('Humidity is matched', function (t) {
  t.plan(1)
  var responsePart = [{ DeviceID:'XYZ', DeviceName: 'Device-Name-XY', Data: { Humidity: 98 }}]
  var metrics = exporter(responsePart, 'intl')
  t.ok(metrics.match(/weather_humidity_percent{id="XYZ",name="Device-Name-XY"} 98/g))
})

test('Luminance is matched', function (t) {
  t.plan(1)
  var responsePart = [{ DeviceID:'XYZ', DeviceName: 'Device-Name-XY', Data: { Luminance: 18 }}]
  var metrics = exporter(responsePart, 'intl')
  t.ok(metrics.match(/weather_luminance_nit{id="XYZ",name="Device-Name-XY"} 18/g))
})

test('UVIndex is matched', function (t) {
  t.plan(1)
  var responsePart = [{ DeviceID:'XYZ', DeviceName: 'Device-Name-XY', Data: { UVIndex: 2 }}]
  var metrics = exporter(responsePart, 'intl')
  t.ok(metrics.match(/weather_uv_indexed{id="XYZ",name="Device-Name-XY"} 2/g))
})

test('Night is matched', function (t) {
  t.plan(1)
  var responsePart = [{ DeviceID:'XYZ', DeviceName: 'Device-Name-XY', Data: { Night: true }}]
  var metrics = exporter(responsePart, 'intl')
  t.ok(metrics.match(/weather_is_night_binary{id="XYZ",name="Device-Name-XY"} 1/g))
})

test('Rain is matched', function (t) {
  t.plan(1)
  var responsePart = [{ DeviceID:'XYZ', DeviceName: 'Device-Name-XY', Data: { Rain: true }}]
  var metrics = exporter(responsePart, 'intl')
  t.ok(metrics.match(/weather_is_rain_binary{id="XYZ",name="Device-Name-XY"} 1/g))
})
