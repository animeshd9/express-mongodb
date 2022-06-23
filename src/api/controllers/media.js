"use strict"
const Media = require('../models/media')
const multer = require('multer')
const sharp = require('sharp')
const path = require('path')
const fs = require('fs')
const mediaModel = require('../models/media')
const config = require('../../config/config').getConfig()
const slugify = require('slugify')


const storage = multer.diskStorage({
    'destination':function(req, file, cb) {
        const dir = config.UPLOAD_PATH
        fs.exists( dir, ( exist ) => {
            if ( !exist ) {
                return fs.mkdir( dir, ( error ) => cb( error, dir ) )
            }
            return cb( null, dir )
        } )
        
    },
    'filename': function(req, file, cb) {
        const fileOriginalName = slugify(file.originalname,{
            replacement: '-',
            trim : true,
            })

        cb(null, `${(new Date()).getTime()}-${fileOriginalName}`)
    }
})
exports.upload = multer({
    'storage':storage,
    'limits':{
        'fileSize':1024 * 1024 * 5
    },
    'fileFilter': function( req, file, cb ) {
       
        console.log( file );
        console.log('uplodad')
        
        if ( file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/gif' ) {
            cb( null, true );
        } else {
            cb( null, false );
        }
    }
})


exports.getMedia = async (req, res, next) => {
    try {
    console.log('getmedia')
    console.log(req.params.mediaId)
    res.send(req.params.mediaId )
    } catch (err) {
        console.log(err)
    }
}

exports.addMedia = async (req, res, next) => {
   try {
       console.log('add')
    const uploadPath = config.UPLOAD_PATH
    req.file.path = req.file.path.split( `${uploadPath }/` )[ 1 ];
    console.log( req.file.path );
    console.log(req.file)
    if(req.file.size > 1024 * 500) {
        console.log('resize')
        // console.log(path.resolve(__dirname+req.file.path))
       console.log(path.resolve(`${__dirname}/../../uploads/${req.file.path}`))

        console.log(__dirname)
        console.log('working')
        // console.log()
        await sharp(path.resolve(`${__dirname}/../../uploads/${req.file.path}`)).resize(800, 800).toFile(path.resolve(`${__dirname}/../../uploads/new/${req.file.path}`))
    }
    const mediaData = new mediaModel({
        originalname: req.file.originalname,
        encoding: req.file.encoding,
        mimetype: req.file.mimetype,
        path: req.file.path,
        size: req.file.size

    })
    mediaData.save((err, data) => {
        if(!err) {
            res.send(data)
            console.log(data)
            
        }else {
            console.log(err)
            res.send(err)
        }
    })
    console.log(req.file)
    console.log('resized')

   } catch (err) {
       console.log(err)
   }
}

exports.deleteMedia = async (req, res, next) => {
    try {
        
    } catch (err) {
        
    }
}