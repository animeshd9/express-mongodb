'use strict'
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
require('./api/utils/database')
require('dotenv').config()
const swaggerJsDoc = require('swagger-jsdoc')
const swaggerUi = require('swagger-ui-express')


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

const swaggerOptions = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'Swagger Test Api',
            version: '1.0.0',
            description: 'Swagger and OpenApi Standard Implementation',
            contact: {
                name: 'Animesh Das'
            },
        },
    },
    apis:['./api/routes/*.js']
    // apis:['index.js'] 

}

const swaggerDocs = swaggerJsDoc(swaggerOptions)
console.log(swaggerDocs)
console.log(swaggerOptions)

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs))

app.use(cors(corsConfig))

app.use(bodyParser.urlencoded({extended: false}))

app.use(express.json())

/**
 * @swagger
 * /:
 *   get:
 *     description: Welcome to swagger-jsdoc!
 *     responses:
 *       200:
 *         description: Returns a mysterious string.
 */

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