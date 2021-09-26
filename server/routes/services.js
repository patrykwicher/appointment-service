const express = require('express');
const Service = require('../models/serviceSchema.js');

const servicesRouter = express.Router();

servicesRouter.post('/save-service', async (req, res) => {
    try {
        const newService = new Service(req.body);

        const xd = await newService.save(err => {
            if (err) console.log(err);
        });
    } catch(err) {
        console.log(err);
    }
})

module.exports = servicesRouter;