const express = require('express');
const Service = require('../models/serviceSchema.js');

const servicesRouter = express.Router();

servicesRouter.post('/save-service', async (req, res) => {
    try {
        const newService = new Service(req.body);

        await newService.save(err => {
            if (err) console.log(err);
        });
    } catch(err) {
        console.log(err);
    }
})

servicesRouter.post('/fetch-user-visits', async (req, res) => {
    try {
        console.log(req.body);

        const userVisits = await Service.find({ userId: req.body._id }, (err, docs) => {
            if(err) {
                return res.json(400).json(err);
            } else {
                return res.send(docs);
            }
        });
    } catch(err) {
        console.log(err);
    }
})


module.exports = servicesRouter;