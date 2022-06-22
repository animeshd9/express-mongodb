const express = require('express')
const mediaController = require('../controllers/media')
// const uploadMiddleware = require('../middlewares/uploadFile')

const Router = express.Router()

Router.get('/get-media/:mediaId',mediaController.getMedia)
Router.post('/add-media',[mediaController.upload.single('file')], mediaController.addMedia)


module.exports = Router