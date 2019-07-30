const express = require('express')
const hbs = require('hbs')
const forecast = require('./utils/forecast')
const geocode = require('./utils/geocode')

const app = express()
const port = 3000

app.set('view engine', 'hbs');
app.set('views', `${__dirname}/templates/views`);
hbs.registerPartials(`${__dirname}/templates/partials`)

app.use(express.static(`${__dirname}/public`))


app.get('', (request, response) => {
    response.render('index', {
        title: 'Weather',
        name: 'Roman Panchenko',
    });
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Roman Panchenko'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'This is some helpful text.',
        title: 'Help',
        name: 'Roman Panchenko'
    })
})

app.get('/weather', (request, response) => {
    if (!request.query.adress) {
        return response.send({
            error: 'Please enter your location',
        })
    }
    geocode(request.query.adress, (err, {latitude, longitude}) => {
        if(err) {
                return response.send({
                error: 'Something went wrong',
            })
        }

        forecast(latitude, longitude, (error, data) => {
            if(error) return response.send({ err })

            return response.send({
                forecast: data,
                location: [latitude, longitude],
                adress: request.query.adress,
            });
        })
    })
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }

    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Roman Panchenko',
        errorMessage: 'Help article not found.'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Roman Panchenko',
        errorMessage: 'Page not found.'
    })
})


app.listen(port, (err) => {
    if (err) {
        return console.log('something bad happened', err)
    }

    console.log(`server is listening on ${port}`)
})