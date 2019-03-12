let express = require('express');
let router = express.Router();
let Deals = require('./../models/deals');
let { ensureAuthenticated } = require('../config/auth');


router.get('/view',ensureAuthenticated,(req,res)=>{
    Deals.find({},(err,data)=>{
        if (err) {
            console.log(err)
        }else{
            res.render('dealsview',{data});
            console.log('received details '+data);
        }
    });
});

router.get('/add',ensureAuthenticated,(req,res)=>{
    res.render('addDeals');
});

router.post('/add',ensureAuthenticated,(req,res)=>{
    let { description,title,number,expire,forW,image,link } = req.body;
    let img = image.replace('./../assets/','/assets/');
    console.log({ description,title,expire,number,forW,img,link });
    Deals.insertMany({ description,title,expire,number,forW,img,link,author:req.user.name },(err)=>{
        if (err) throw err;
        res.render('addDeals');
        req.flash('success','item added successfully');
    });
});

// delete
router.delete('/:id',ensureAuthenticated,(req,res)=>{
    Deals.deleteMany({_id:req.params.id},(err)=>{
        if(err){
            console.log(err);
        }else{
            req.flash('success','item deleted');
            res.send('success');
        }
    });
});



module.exports = router;