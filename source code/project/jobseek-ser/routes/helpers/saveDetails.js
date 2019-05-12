var mongoose = require('mongoose');
var router = require('express').Router();
var Hr = mongoose.model('hrModel');
var Applicant = mongoose.model('applicantModel');

exports.saveDetails = async (req, res, next) => {
    console.log('inside savedetails');
    console.log(req);
    
}

module.exports = router;