module.exports = function(resp, unit) {
  return (unit == 'intl' ? 
`# TYPE weather_temperature_celsius
# HELP weather_temperature_celsius Temperature in Celsius

# TYPE weather_pressure_hectopascal gauge
# HELP weather_pressure_hectopascal` :

`# TYPE weather_temperature_fahrenheit
# HELP weather_temperature_fahrenheit Temperature in Fahrenheit

# TYPE weather_pressure_inhg gauge
# HELP weather_pressure_inhg Atmospheric Pressure in Inch of mercury`) + `

# TYPE weather_measurement_epoch gauge
# HELP weather_measurement_epoch Unix timestamp of last measurement

# TYPE weather_location_coordinates gauge
# HELP weather_location_coordinates Geolocation; latitude and longitude

# TYPE weather_humidity_percent gauge
# HELP weather_humidity_percent Relative humidity in percent

# TYPE weather_luminance_nit gauge
# HELP weather_luminance_nit Luminance in candela per square metre

# TYPE weather_uv_indexed gauge
# HELP weather_uv_indexed Ultraviolet index on a scale of 11

# TYPE weather_is_night_binary gauge
# HELP weather_is_night_binary Boolean value if night time is here

# TYPE weather_is_rain_binary gauge
# HELP weather_is_rain_binary Boolean value if raining
`.concat(resp.map(getMetrics(unit)))

}

function getMetrics(unit) {
  return (probe) => {
    var data = probe.Data
    var id = probe.DeviceID
    var name = `${probe.DeviceName}`
    var { LAT, LON } = probe
    var probeId = `id="${id}",name="${name}"`

    return (unit == 'intl' ? 
`
weather_temperature_celsius{${probeId}} ${data.Temperature}
weather_pressure_hectopascal{${probeId}} ${data.Pressure}` : 
`
weather_temperature_fahrenheit{${probeId}} ${data.Temperature}
weather_pressure_inhg{${probeId}} ${data.Pressure}`) + 
`
weather_measurement_epoch{${probeId}} ${data.TS}
weather_location_coordinates{dimension="latitude"} ${LAT}
weather_location_coordinates{dimension="longitude"} ${LON}
weather_humidity_percent{${probeId}} ${data.Humidity}
weather_luminance_nit{${probeId}} ${data.Luminance}
weather_uv_indexed{${probeId}} ${data.UVIndex}
weather_is_night_binary{${probeId}} ${data.Night ? 1 : 0}
weather_is_rain_binary{${probeId}} ${data.Rain ? 1 : 0}
`

  }
}
