let mongoose = require('mongoose');
let express = require("express");
let router = express.Router();

//Create Model Class
let contactModel = mongoose.Schema(
{
    Name: String,
    Phone: String,
    Birthday: String,
    Email: String,
},
{
    collection: "Contact"
});

module.exports = mongoose.model('Contact', contactModel);