const express = require('express');
const Service = require('../models/serviceSchema.js');

const servicesRouter = express.Router();

servicesRouter.post('/save-service', async (req, res) => {
    try {
        const arrayOfNewServices = req.body;
        console.log(arrayOfNewServices);

        arrayOfNewServices.forEach(async service => {
            const newService = new Service(service);

            await newService.save(err => {
                if(err) {
                    console.log(err);
                } else {
                    return;
                }
            })
        })
    } catch(err) {
        console.log(err);
    }
})

servicesRouter.post('/fetch-user-visits', async (req, res) => {
    try {
        const userVisits = await Service.find({ userId: req.body._id }, (err, docs) => {
            if(err) {
                return res.json(400).json(err);
            } 
            if(!docs) {
                return;
            }
            else {
                return res.send(docs);
            }
        });
    } catch(err) {
        console.log(err);
    }
})

setInterval(async () => {
    try {
        const today = new Date();
        const findAllVisits = await Service.find();
        
        findAllVisits.find(async visit => {
            if(visit.dateOfAppointment.getTime() < today.getTime()) {
                await Service.deleteOne({ _id: visit._id });
            }
        })
    } catch(err) {
        console.log(err);
    }
}, 36000);

module.exports = servicesRouter;