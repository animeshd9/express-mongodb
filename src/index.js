const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
require('./api/utils/database')
require('dotenv').config()

const mediaRoute = require('./api/routes/media')
const userRoute = require('./api/routes/user')

const app = express()

const port  = process.env.PORT || 5000
console.log(process.env.PORT)

const corsConfig = {
    origin: `*`,
    methods : [`GET`, `PUT`, `POST`, `DELETE`],
    allowedHeaders : [`Content-Type`, `Authorization`, 'Set-Cookie']
}

app.use(cors(corsConfig))

app.use(bodyParser.urlencoded({extended: false}))

app.use(express.json())

app.get("/api/test", (req, res, next) => {
    try {
        res.json('test data')
        throw new Error("test data")
    } catch (err) {
        err.statusCode = 500 
        err.status = 'faild'
        next(err)
    }
})
console.log(__dirname)
app.use('/api/media',mediaRoute)
app.use('/api/user',userRoute)

app.all('*', (req, res, next) => {
    const err = new Error(`Can't find ${req.originalUrl} on this server!`)
    err.statusCode = 404
    err.status = 'failed'
    next(err)

})

app.listen(port , () => {
    console.log(`Server running on port ${port}`)
})