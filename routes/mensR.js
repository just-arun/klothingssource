let express = require('express');
let router = express.Router();
let upload = require('./../util/uploadImg');
let { ensureAuthenticated } = require('../config/auth');

let Mens = require('../models/mens');

// add items to mens
router.get('/additem',(req,res)=>{
    res.render('mens');
});


// saving the receiced items from the additem page
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
            Mens.insertMany(newShit,(err)=>{
                if (err) throw err;
                req.flash('success','item added');
                res.render('mens');
            });
        }
    })
});


// showing all the items
router.get('/view',ensureAuthenticated,(req,res)=>{
    Mens.find({},(err,data)=>{
        if (err) {
            console.log(err);
        }else{
            res.render('viewMesn',{
                data:data
            });
        }
    });
});


// showing the specific items
router.post('/view/filter',(req,res)=>{
    let { itemCatogery } = req.body;
    Mens.find({itemCatogery},(err,data)=>{
        if(err) throw err;
        res.render('viewMesn',{
            data:data
        });
    });
    
});


// serving the edit item page
router.get('/edit/:id',ensureAuthenticated,(req,res)=>{
    Mens.findById(req.params.id,(err,data)=>{
        if(err) throw err;
        res.render('editMens',{
            men:data
        });
        console.log(data);
    })
});


// saving the edited item
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
            let newShit = { name,merchentName,merchentUrl,colorValue,itemSize,itemCatogery,marketPrice,ourPrice,discount,description,img,author:req.user.name }
            console.log(newShit);
            Mens.updateOne(query,newShit,(err)=>{
                if (err) throw err;
                req.flash('success','item edited successfully');
                res.render('mens');
            });
        }
    })
});


// deleting items
router.delete('/:id',ensureAuthenticated,(req,res)=>{
    Mens.deleteMany({_id:req.params.id},(err)=>{
        if(err){
            console.log(err);
        }else{
            req.flash('success','item deleted');
            res.send('success');
        }
    });
});


module.exports = router;