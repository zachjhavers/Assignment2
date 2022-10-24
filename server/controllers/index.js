let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');
let passport = require('passport');

//Define User Model Instance
let userModel = require('../models/user');
let User = userModel.User;

module.exports.displayHomePage = (req, res, next) => {
    res.render('index', {title: 'Home', displayName: req.user ? req.user.displayName: ""});
}

module.exports.displayAboutPage = (req, res, next) => {
    res.render('about', { title: 'About', displayName: req.user ? req.user.displayName: ""});
}

module.exports.displayProjectsPage = (req, res, next) => {
    res.render('projects', { title: 'Projects', displayName: req.user ? req.user.displayName: ""});
}

module.exports.displayServicesPage = (req, res, next) => {
    res.render('services', { title: 'Services', displayName: req.user ? req.user.displayName: ""});
}

module.exports.displayContactPage = (req, res, next) => {
    res.render('contact', { title: 'Contact Us', displayName: req.user ? req.user.displayName: ""});
}

module.exports.displayLoginPage = (req, res, next) => {
    //Check If User Logged In
    if(!req.user)
    {
        res.render('auth/login',
        {
            title: "Login",
            messages: req.flash('loginMessage'),
            displayName: req.user ? req.user.displayName: ""
        })
    }
    else
    {
        return  res.redirect('/');
    }
};

module.exports.processLoginPage = (req, res, next) => {
    passport.authenticate('local',
    (err, user, info) => {
        //Server Err
        if(err)
        {
            return next(err);
        }
        //Is There A Login Error
        if(!user)
        {
            req.flash('loginMessage', 'Authentication Error');
            return res.redirect('/login');
        }
        req.login(user, (err) => {
            //Server Error
            if(err)
            {
                return next(err);
            }
            return res.redirect('/contact-list')
        });
    })(req,res, next);
};

module.exports.displayRegisterPage = (req, res, next) => {
    //Check if the user is not already logged in
    if(!req.user)
    {
        res.render('auth/register',
        {
            title: 'Register',
            messages: req.flash('registerMessage'),
            displayName: req.user ? req.user.displayName: ""
        });
    }
    else
    {
        return res.redirect('/');
    }
}

module.exports.processRegisterPage = (req, res, next) => {
    //Initiate A User Object
    let newUser = new User({
        username: req.body.username,
        //password: rew.body.password
        email: req.body.email,
        displayName: req.body.displayName
    });

    User.register(newUser, req.body.password, (err) =>{
        if(err)
        {
            console.log('Error: Inserting New User');
            if(err.name == "UserExistsError")
            {   
                req.flash(
                    'registerMessage',
                    'Registration Error: User Already Exists'
                );
                console.log('Error: User Already Exists')
            }
            return res.render('auth/register', 
            {
                title: 'Register',
                messages: req.flash('registerMessage'),
                displayName: req.user ? req.user.displayName: ""
            });
        }
        else
        {
            //If No Error
            //Redirect And Authenticate
            return passport.authenticate('local')(req,res,()=>{
                res.redirect('/contact-list')
            });
        }
    });
}

module.exports.performLogout = (req,res,next) => {      
    req.logout(req.user, err => {
        if(err) return next(err);
        res.redirect("/");
    });
}