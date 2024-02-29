const mongoose = require('mongoose');

// Define the Driver schema
const driverSchema = new mongoose.Schema({
    ufirstname: String,
    mobileno: String,
    userpassword: String,
    userconfirmpassword: String,
    email: String,
});

// Create the Driver model
const DriverModel = mongoose.model('Driver', driverSchema);

module.exports = DriverModel;
