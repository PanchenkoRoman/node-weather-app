const request = require('request')

const token = 'pk.eyJ1IjoicnBhbmNoZW5rbyIsImEiOiJjanlpdHNiamwwY3V3M21xaWEwYnE2MDJjIn0.XVSxxjl1r41zc_daIGHK2g';
const geocode = (address, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=${token}`

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to location services!', undefined)
        } else if (!body.features) {
            callback('Unable to find location. Try another search.', undefined)
        } else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode