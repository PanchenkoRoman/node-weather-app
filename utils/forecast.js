const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = `https://api.darksky.net/forecast/12cad2b208ceb9a04c62d9acd101887a/${latitude},${longitude}`

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (body.error) {
            callback('Unable to find location', undefined)
        } else {
            callback(undefined, `${body.daily.data[0].summary} It is currently ${Math.round((body.currently.temperature -32) * 5/9)} degress out. There is a ${body.currently.precipProbability}% chance of rain.`)
        }
    })
}

module.exports = forecast