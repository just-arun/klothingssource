let express = require('express');
let router = express.Router();
let upload = require('./../util/uploadImg');
let { ensureAuthenticated } = require('../config/auth');

let Accesories = require('../models/accessories');


router.get('/additem',ensureAuthenticated,(req,res)=>{
    res.render('accessories');
});


router.post('/addItem',ensureAuthenticated,(req,res)=>{
    upload(req,res,(err)=>{
        console.log(req.body);
        if (err) {
            console.log(err);
        } else{
            let { name,merchentName,merchentUrl,colorValue,gender,itemSize,itemCatogery,marketPrice,ourPrice,discount,description } = req.body;
            let img=[];
            req.files.forEach((shit)=>{
                img.push(shit.path.replace('public/','/'));
            })
            let newShit = { name,merchentName,merchentUrl,gender,colorValue,itemSize,itemCatogery,marketPrice,ourPrice,discount,description,img,author:req.user.name }
            console.log(newShit);
            Accesories.insertMany(newShit,(err)=>{
                if (err) throw err;
                res.render('accessories');
            });
        }
    })
});

router.get('/view',ensureAuthenticated,(req,res)=>{
    Accesories.find({},(err,data)=>{
        if (err) {
            console.log(err);
        }else{
            res.render('viewAccessories',{
                data:data
            });
        }
    });
});


router.post('/view/filter',(req,res)=>{
    let { itemCatogery } = req.body;
    Accesories.find({itemCatogery},(err,data)=>{
        if(err) throw err;
        res.render('viewAccessories',{
            data:data
        });
    });
    
});


router.get('/edit/:id',ensureAuthenticated,(req,res)=>{
    Accesories.findById(req.params.id,(err,data)=>{
        if(err) throw err;
        res.render('editAccessories',{
            accessories:data
        });
        // console.log(data);
    })
});

router.post('/edit/:id',ensureAuthenticated,(req,res)=>{
    let query = {_id:req.params.id};
    upload(req,res,(err)=>{
        if (err) {
            console.log(err);
        } else{
            let { name,merchentName,merchentUrl,colorValue,gender,itemSize,itemCatogery,marketPrice,ourPrice,discount,description } = req.body;
            let img=[];
            req.files.forEach((shit)=>{
                img.push(shit.path.replace('public/','/'));
            })
            let newShit = { name,merchentName,merchentUrl,colorValue,gender,itemSize,itemCatogery,marketPrice,ourPrice,discount,description,img,author:req.user.name }
            console.log(newShit);
            Accesories.updateOne(query,newShit,(err)=>{
                if (err) throw err;
                res.render('accessories');
            });
        }
    })
});

router.delete('/:id',ensureAuthenticated,(req,res)=>{
    Accesories.deleteMany({_id:req.params.id},(err)=>{
        if(err) throw err;
        res.send('success');
    });
});


module.exports = router;