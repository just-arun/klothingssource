let express = require('express');
let route = express.Router();
let bcrypt = require('bcryptjs');
let passport = require('passport');
let { ensureAuthenticated } = require('../config/auth');

let Users = require('./../models/user');


// Login form
route.get('/login',(req,res)=>{
    res.render('login');
})

route.get('/regester',(req,res)=>{
    // let errors = [];
    // if (req.user.email == "dhakshana29dm@gmail.com" || req.user.email == "karthicknaresh365@gmail.com") {
    //     res.render('regester');
    // } else {
    //     errors.push('You are not authorised');
    //     res.render('login');
    // }
        res.render('regester');
});

route.post('/regester',(req,res)=>{
    let { name,email,password,password2 } = req.body; 
    let errors = [];
    if (!name || !email || !password || !password2) {
        errors.push('please fillin all the fields');
    }
    if (password != password2) {
        errors.push('password dosent match');
    }
    if (password.length < 6){
        errors.push('password should be atlease 6 characters long');
    }
    if (errors.length > 0) {
        errors.push('please fillin all the fieald as required');
    } else{
        // validation pass
        Users.findOne({ email: email })
            .then(user=>{
                // user exists
                if (user) {
                    errors.push('user eixist');
                    res.render('regester',{errors,name,email,password,password2});
                } else{
                    let newUser = new Users({name,email,password});
                    bcrypt.genSalt(10,(err,salt)=> bcrypt.hash(password,salt,(err, hash)=>{
                        if (err) throw err;
                        // set password to hash
                        newUser.password = hash;
                        // save user
                        newUser.save()
                            .then(user=>{
                                req.flash('success_msg','you are now regestered');
                                res.redirect('/admin/users/login');
                                console.log(newUser);
                            })
                            .catch(err=>console.log(err));
                    }))
                }
            });
    }

});


// login process
route.post('/login',(req,res,next)=>{
    console.log('process start...');
    passport.authenticate('local',{
        successRedirect:'/admin/users/api/dashboard',
        failureRedirect:'/admin/users/login',
        failureFlash:true
    })(req,res,next);
    console.log('process finished...');
});


// log out
route.get('/logout',(req,res)=>{
    req.logout();
    req.flash('success_msg','u logged out');
    res.redirect('/admin/users/login');
});

module.exports = route;