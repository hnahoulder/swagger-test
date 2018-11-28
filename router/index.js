const express = require('express');
const api = express.Router();
const phones = require('../data');

/**
 * @swagger
 * /phones:
 *  get:
 *          description: Retrieve all phones
 *          tags:
 *             - phones
 *          produces:
 *             - application/json
 *          responses:
 *              200:
 *                  description: phones
 */
api.get('/phones', (req, res) => {
    res.json({success: true, phones});
});




/**
 * @swagger
 * /phones/{id}:
 *   get:
 *     description: Retrieve an specific phone
 *     tags:
 *       - phones
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         description: id of the phones to  retrieve
 *         in: path
 *         required: true
 *         type: number
 *     responses:
 *       200:
 *         description: phone
 *
 */
api.get('/phones/:id', (req, res) => {
    const id = req.params.id;
    const phone = phones [id];
    res.send({success: true, phone});
});

module.exports = [api];
