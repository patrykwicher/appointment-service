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

clientsRouter.post('/login', (req, res) => {
    passport.authenticate('local', (error, user, info) => {
        if(error) {
            return res.status(500).json({ message: 'Something wrong with server/db' })
        }

        if(!user) {
            return res.status(400).json({ message: 'Wrong email or password' })
        }

        req.login(user, (error) => {
            if(error) {
                return res.status(400).json({ error: error });
            }

            return res.status(200).json(user);
        });
    })(req, res);
});

clientsRouter.get('/logout', (req, res) => {
    req.logout();
    res.status(200).json('logged out');
})

module.exports = clientsRouter;