const mongoose = require('mongoose')

require('dotenv').config()

const mongoUrl = process.env.mongo_url || 'mongodb+srv://Animesh:mongodb@cluster0.tc9y3.mongodb.net/Broadifi?retryWrites=true&w=majority'

mongoose.connect(mongoUrl, { useNewUrlParser: true , useUnifiedTopology: true})
.then(() => {
    console.log("Connected to Database")
}).catch(err => {
    console.error('App starting error:', err.message)
    process.exit()
})
