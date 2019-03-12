const localStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
let User = require('./../models/user');
// let config = require('./database');
let bcrypt = require('bcryptjs');




module.exports = function (passport){
    passport.use(
        new localStrategy({ usernameField: 'email' }, (email, password, done)=>{
            // match user
            User.findOne({email:email})
            .then(user => {
                if (!user) {
                    return done(null, false, {message: 'that email is not regester'});
                }
                // password match
                bcrypt.compare(password,user.password, (err, isMatch)=>{
                    if(err) throw err;
                    if(isMatch){
                        return done(null, user);
                    } else {
                        return done(null, false,{ message: 'password incorrect' })
                    }
                });
            })
            .catch(err=>console.log(err))
        })
    );

    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });
    
    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });

}