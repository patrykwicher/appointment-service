const express = require('express');
const Client = require('../models/clientSchema.js');
const bcrypt = require('bcrypt');
const passport = require('../passport-config.js');

const clientsRouter = express.Router();


clientsRouter.post('/register', async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const newClient = new Client({
            fullName: req.body.fullName,
            email: req.body.email,
            password: hashedPassword,
            phoneNumber: req.body.phoneNumber
        })

        newClient.save(err => {
            if (err) { err.message };
        });
    } catch (err) {
        console.log(err);
    }
});

clientsRouter.post('/login', passport.authenticate('local', { 
    successRedirect: '/clients/login', 
    failureRedirect: '/clients', 
    failureFlash: true 
}));

clientsRouter.get('/login', async (req, res) => {
    try {
        const client = await Client.findOne(req.body.email);
        res.send(client);
    } catch (err) {
        console.log(err);
    }
});

clientsRouter.get('/', async (req, res) => {
    res.send({ message: 'xd'});
});

module.exports = clientsRouter;