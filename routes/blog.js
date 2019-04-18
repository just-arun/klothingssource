const express = require('express')

const route = express.Router();


route.get('/about',(req,res)=>{
    res.render('blog/about');
});

route.get('/terms-and-conditions',(req,res)=>{
    res.render('blog/TermsAndConditions');
});

route.get('/privacy-policy',(req,res)=>{
    res.render('blog/privacy');
});



module.exports = route;
