let express = require('express');
let router = express.Router();
let Coupen = require('./../models/coupens');
let { ensureAuthenticated } = require('../config/auth');


router.get('/view',ensureAuthenticated,(req,res)=>{
    Coupen.find({},(err,data)=>{
        if (err) {
            console.log(err)
        }else{
            res.render('coupensview',{data});
            console.log('received details '+data);
        }
    });
});

router.get('/add',ensureAuthenticated,(req,res)=>{
    res.render('addCoupens');
});

router.post('/add',ensureAuthenticated,(req,res)=>{
    let { description,title,number,expire,forW,image,link } = req.body;
    let img = image.replace('./../assets/','/assets/');
    Coupen.insertMany({ description,expire,title,number,forW,img,link,author:req.user.name },(err)=>{
        if (err) throw err;
        res.render('addCoupens');
        console.log({ description,expire,title,number,forW,img,link,author:req.user.name });
    });
});

// delete 
router.delete('/:id',ensureAuthenticated,(req,res)=>{
    Coupen.deleteMany({_id:req.params.id},(err)=>{
        if(err){
            console.log(err);
        }else{
            req.flash('success','item deleted');
            res.send('success');
        }
    });
});





module.exports = router;