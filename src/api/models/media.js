const mongoose = require('mongoose')

const Schema = mongoose.Schema

const MediaSchema = new Schema({
    'originalname': {
        'type': String,
        'required': false
    },
    'encoding':{
        'type': String,
        'required': false
    },
    'mimetype':{
        'type': String,
        'required': false
    },
    'path':{
        'type': String,
        'required':false
    },
    'size':{
        'type': Number,
        'required': false
    },
    
},{'timestamps': true})

module.exports = mongoose.model("Media",MediaSchema)