const express = require('express')
const mediaController = require('../controllers/media')

const Router = express.Router()

//Media Routes
/**
 * @swagger
 * paths:
 * /media:
 * get:
 *  description: Use to request media by id 
 *  responses:
 *      '200':
 *          description: A successfull response
 */
Router.get('/get-media/:mediaId',mediaController.getMedia)
Router.post('/add-media',[mediaController.upload.single('file')], mediaController.addMedia)
/**
 * @swagger
 * /:
 *   get:
 *     description: Welcome to swagger-jsdoc!`
 *     responses:
 *       200:
 *         description: Returns a mysterious string.
 */
 Router.get('/', (req, res) => {
    res.send('Hello World!');
  });


module.exports = Router