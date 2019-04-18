let express = require('express');
let router = express.Router();
let Mens = require('../models/mens');
let Womens = require('./../models/womens');
let Accessories = require('./../models/accessories');
let mail = require('./../config/mail');
let nodemailer = require('nodemailer');
let Maildb = require('./../models/submail');
let Coupens = require('./../models/coupens');
let Deals = require('./../models/deals');
let fs = require('fs');
let request = require('request');


// send all data from all parts
router.get('/allData',(req,res)=>{
    Mens.find({},(err,menData)=>{
        if (err) throw err;
        Womens.find({},(err,womensData)=>{
            if (err) throw err;
            Accessories.find({},(err,access)=>{
                if(err) throw err;
                res.send({menData,womensData,access});
            });
        });
    });
});

// send pirticular item coresponding to it's address
router.get('/getOne/:id',(req,res)=>{
    let id = req.params.id;
    console.log(id);
    Mens.findById(id,(err,data)=>{
        if(err) throw err;
        if (data) {
            res.send(data);
        }else{
            Womens.findById(id,(err,data)=>{
                if(err) throw err;
                if (data) {
                    res.send(data);
                } else{
                    Accessories.findById(id,(err,data)=>{
                        if(err) throw err;
                        if (data) {
                            res.send(data);
                        }
                    })
                }
            });
        }
    });
});

// mens catogery filter
router.get('/mens/:catagory',(req,res)=>{
    let catagory = req.params.catagory;
    console.log(catagory);
    Mens.find({itemCatogery:catagory},(err,data)=>{
        if(err) throw err;
        console.log(data);
        res.send(data);
    });
});

// womens catagories
router.get('/womens/:catagory',(req,res)=>{
    let catagory = req.params.catagory;
    console.log(catagory);
    Womens.find({itemCatogery:catagory},(err,data)=>{
        if(err) throw err;
        console.log(data);
        res.send(data);
    });
});


router.get('/accessories',(req,res)=>{
    Accessories.find({},(err,data)=>{
        if (err) {
            console.log(err);
        } else res.send(data);
    })
});

router.get('/accessories/womens/:catagory',(req,res)=>{
    let catogers = req.params.catagory;
    Accessories.find({gender:"female",itemCatogery:catogers},(err,data)=>{
        if (err) {
            console.log(err);
        } else {
            console.log({gender:"female",itemCatogery:catogers});
            res.send(data);
        }
    })
});


router.get('/accessories/men/:catagory',(req,res)=>{
    let catogers = req.params.catagory;
    Accessories.find({gender:"female",itemCatogery:catogers},(err,data)=>{
        if (err) {
            console.log(err);
        } else {
            console.log({gender:"male",itemCatogery:catogers});
            res.send(data);
        }
    })
});



// send data for deals page
router.get('/deals',(req,res)=>{
    Deals.find({},(err,data)=>{
        if (err) {
            console.log(err);
        } else{
            res.send(data);
            console.log(data);
        }
    });
});

// send filtered deals
router.get('/deals/:catogery',(req,res)=>{
    let shit = req.params.catogery;
    Deals.find({forW:shit},(err,data)=>{
        if (err) {
            console.log(err);
        } else{
            res.send(data);
            console.log(data);
        }
    });
});


// send data for coupens page
router.get('/coupens',(req,res)=>{
    Coupens.find({},(err,data)=>{
        if (err) {
            console.log(err);
        } else{
            res.send(data);
        }
    });
});

// send filtered coupens
router.get('/coupens/:catogery',(req,res)=>{
    let shit = req.params.catogery;
    Coupens.find({forW:shit},(err,data)=>{
        if (err) {
            console.log(err);
        } else{
            res.send(data);
            console.log(data);
        }
    });
});

// find one coupens
router.get('/coupens/item/:ids',(req,res)=>{
    let shit = req.params.ids;
    Coupens.findById(shit,(err,data)=>{
        if (err) {
            console.log(err);
        } else{
            res.send(data);
            console.log(data);
        }
    });
});

// sending Cuelink api data to client
router.get('/offers-and-coupens',(req,res)=>{

    request({
    method: 'GET',
    url: 'https://www.cuelinks.com/api/v2/offers.json',
    headers: {
        'Authorization': 'Token token=DsELJbTPRNwn6N79BDHafoo6Dryeq5NDwRkPb_AimMQ',
        'Content-Type': 'application/json'
    }}, function (err, resp, body) {
    let data = [];
    data = resp.body;
    console.log(data);
    res.send(data);
    if (err) {
        console.log(err);
    }
    });
});


// send items to mini catogery
router.get('/shop/catogery/:cata',(req,res)=>{
    let catoghery = req.params.cata;
    let quere = {
        itemCatogery:catoghery
    }
    Mens.find(quere,(err,menData)=>{
        if (err) throw err;
        Womens.find(quere,(err,womensData)=>{
            if (err) throw err;
            Accessories.find(quere,(err,access)=>{
                if(err) throw err;
                res.send({menData,womensData,access});
            });
        });
    });
});


// sending and storing customer mail id
router.post('/sendMail/:mail',(req,res)=>{
    let subscriberMail = req.params.mail;

    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: mail.uName,
            pass: mail.password
        }
    });

    const mailOptions = {
        from:subscriberMail, 
        to: mail.uName, 
        subject: 'New user subscribed to your website', 
        html:`<div> U got an new user </div>`
    };

    Maildb.insertMany({email:subscriberMail},(err)=>{
        if (err) {
            console.log(err);
        }
    })

    transporter.sendMail(mailOptions,(err,info)=>{
        if(err) {
            console.log(err);
            res.send(err);
        }
        else{
            console.log(info);
            res.send('mail sent');
        }
    });
});

module.exports = router;
