const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
    userId: { 
        type: String,
        required: true
    },
    userName: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: Number,
        required: true
    },
    dateOfAppointment: {
        type: Date,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    serviceName: {
        type: String,
        required: true
    },
    typeOfService: {
        type: String,
        required: true
    },
    employee: {
        type: String,
        required: true
    },
    hourOfAppointment: {
        type: String,
        required: true
    }
});

const Service = mongoose.model('Service', serviceSchema);

module.exports = Service;