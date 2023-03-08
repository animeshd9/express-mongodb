const mongoose = require('mongoose')

require('dotenv').config()

const mongoUrl = process.env.mongo_url || 'mongo_url'

mongoose.connect(mongoUrl, { useNewUrlParser: true , useUnifiedTopology: true})
.then(() => {
    console.log("Connected to Database")
}).catch(err => {
    console.error('App starting error:', err.message)
    process.exit()
})
