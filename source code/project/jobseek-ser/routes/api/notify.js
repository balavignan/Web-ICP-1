var mongoose=require('mongoose');
var router = require('express').Router();
var Applicant = mongoose.model('applicantModel');
const sgMail = require('@sendgrid/mail');

    signupNotification=function (req,res){
        console.log('email to sender',req);
          sgMail.setApiKey('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');         const msg = {
            to:req,
            from: 'balavignan97@gmail.com',
            subject: 'JobSeek signup greetings',
            html:`<h1>Hi user,</h1>
                   <h2>You are at right place we will provide good job offers</h2>`
          };
        sgMail.send(msg, (err) => {
            if (!err)
            console.log('mail sent successfully');
            else
            console.log(' mail error');
        });
    }
    jobApplyNotification=function (req,res){
        console.log('email to sender',req);
        sgMail.setApiKey('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');        const msg = {
            to:req,
            from: 'balavignan97@gmail.com',
            subject: 'JobSeek apply notification',
            html:`<h1>Hi user,</h1>
                   <h2> user application was submitted successfully job provider will contact user for further process.</h2>`
          };
        sgMail.send(msg, (err) => {
            if (!err)
            console.log('mail sent successfully');
            else
            console.log('mail error');
        });
    }
    signupHrNotification=function (req,res){
        console.log('email to sender',req);
        sgMail.setApiKey('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');        const msg = {
            to:req,
            from: 'balavignan97@gmail.com',
            subject: 'JobSeek signup grettings for HR',
            html:`<h1>Hi Job Provider,</h1>
                   <h2>Please upload some job offers in your account where user will apply for it</h2>`
          };
        sgMail.send(msg, (err) => {
            if (!err)
            console.log('mail sent successfully');
            else
            console.log('mail error');
        });
    }
    passwordUpdateNotification=function (req,res){
        console.log('email to sender',req);
          sgMail.setApiKey('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');         const msg = {
            to:req,
            from: 'balavignan97@gmail.com',
            subject: 'JobSeek password updated',
            html:`<h1>Hello user,</h1>
                   <h2>As per your request your password was updated successfuly</h2>`
          };
        sgMail.send(msg, (err) => {
            if (!err)
            console.log('mail sent successfully');
            else
            console.log('mail error');
        });
    }
    module.exports={
        passwordUpdateNotification,
        signupHrNotification,
        jobApplyNotification,
        signupNotification

    };
