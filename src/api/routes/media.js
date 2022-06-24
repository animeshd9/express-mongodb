const express = require('express')
const mediaController = require('../controllers/media')

const Router = express.Router()

// Media Routes
/**
 * @swagger
 * 
 * /api/media/get-media/{mediaId}:
 *   get:
 *     summary: Get a media by Id.
 *     parameters:
 *        - in: path 
 *          name: mediaId
 *     description: Welcome to swagger-jsdoc!
 *     responses:
 *       200:
 *         description: Returns a mysterious string.
 *         content:
 *            application/json:
 *              schema:
 *                type: object

 *                properties:
 *                  id:
 *                    type: intger
 *     
 */
Router.get('/get-media/:mediaId',mediaController.getMedia)
Router.post('/add-media',[mediaController.upload.single('file')], mediaController.addMedia)



module.exports = Router