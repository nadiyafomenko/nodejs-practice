import express from 'express'
import hbs from 'hbs'
import path from 'path'
import * as url from 'url';

import geocode from './utils/geocode.js';
import forecast from './utils/forecast.js';

const publicDirectory = path.join(url.fileURLToPath(new URL('.', import.meta.url)), '../public');

const app = express()
const port = process.env.PORT || 3000

const viewsPath = path.join(url.fileURLToPath(new URL('.', import.meta.url)), '../views')
const partialsPath = path.join(url.fileURLToPath(new URL('.', import.meta.url)), '../views/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)


app.use(express.static(publicDirectory))

app.get('/', (req, res) => {
    res.render('index', {
        title: 'Weather app - home page',
        name: 'Nadiia'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About weather app',
        name: 'Nadiia'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Nadiia'
    })
})


app.get('/weather', (req, res) => {
    if (!!req.query?.address) {
        geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
            if (error) {
                return res.send({ error })
            }

            forecast(latitude, longitude, (error, forecastData) => {
                if (error) {
                    return res.send({ error })
                }

                return res.send({
                    title: 'Weather',
                    name: 'Nadiia',
                    location,
                    forecastData,
                })
            })
        })
    } else {
        return res.send({ error: "You must provide address to check weather" })
    }
})

app.get('*', (req, res) => {
    res.render('404', {
        title: 'Not found',
    })
})

app.listen(port, () => console.log('Listening port 3000....'))
