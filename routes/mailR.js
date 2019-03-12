let express = require('express');
let router = express.Router();
let { ensureAuthenticated } = require('../config/auth');

let Mail = require('./../models/submail');


router.get('/',ensureAuthenticated,(req,res)=>{
    Mail.find({},(err,data)=>{
        if(err) throw err;
        res.render('allemails',{data});
    });
});


module.exports = router;
