let express = require('express');
let router = express.Router();
let upload = require('./../util/uploadImg');
let { ensureAuthenticated } = require('../config/auth');

let Womens = require('../models/womens');


router.get('/additem',ensureAuthenticated,(req,res)=>{
    res.render('womens');
});


router.post('/addItem',ensureAuthenticated,(req,res)=>{
    upload(req,res,(err)=>{
        if (err) {
            console.log(err);
        } else{
            let { name,merchentName,merchentUrl,colorValue,itemSize,itemCatogery,marketPrice,ourPrice,discount,description } = req.body;
            let img=[];
            req.files.forEach((shit)=>{
                img.push(shit.path.replace('public/','/'));
            })
            let newShit = { name,merchentName,merchentUrl,colorValue,itemSize,itemCatogery,marketPrice,ourPrice,discount,description,img,author:req.user.name }
            console.log(newShit);
            Womens.insertMany(newShit,(err)=>{
                if (err) throw err;
                res.render('womens');
                req.flash('success','item added');
            });
        }
    })
});

router.get('/view',ensureAuthenticated,(req,res)=>{
    Womens.find({},(err,data)=>{
        if (err) {
            console.log(err);
        }else{
            res.render('viewWomens',{
                data:data
            });
        }
    });
});



router.post('/view/filter',(req,res)=>{
    let { itemCatogery } = req.body;
    Womens.find({itemCatogery},(err,data)=>{
        if(err) throw err;
        res.render('viewWomens',{
            data:data
        });
    });
    
});


router.get('/edit/:id',ensureAuthenticated,(req,res)=>{
    Womens.findById(req.params.id,(err,data)=>{
        if(err) throw err;
        res.render('editWomens',{
            womens:data
        });
        console.log(data);
    })
});

router.post('/edit/:id',ensureAuthenticated,(req,res)=>{
    let query = {_id:req.params.id};
    upload(req,res,(err)=>{
        if (err) {
            console.log(err);
        } else{
            let { name,merchentName,merchentUrl,colorValue,itemSize,itemCatogery,marketPrice,ourPrice,discount,description } = req.body;
            let img=[];
            req.files.forEach((shit)=>{
                img.push(shit.path.replace('public/','/'));
            })
            let newShit = { name,merchentName,merchentUrl,colorValue,itemSize,itemCatogery,marketPrice,ourPrice,discount,description,img }
            console.log(newShit);
            Womens.updateOne(query,newShit,(err)=>{
                if (err) throw err;
                res.render('womens');
                req.flash('success','item modefied successfully');
            });
        }
    })
});

router.delete('/:id',ensureAuthenticated,(req,res)=>{
    Womens.deleteMany({_id:req.params.id},(err)=>{
        if(err) throw err;
        res.send('success');
    });
});



module.exports = router;