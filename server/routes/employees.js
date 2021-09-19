const express  = require('express');
const Employee = require('../models/employeeSchema.js');

const employeesRouter = express.Router();

employeesRouter.get('/', async (req, res) => {
    try {
        const employees = await Employee.find();
        res.send(employees);
    } catch(err) {
        console.log(err);
    }
})

module.exports = employeesRouter;
