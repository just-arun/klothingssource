let mongoose = require('mongoose');
let DealsSchema = mongoose.Schema({
    description:{
        type:String,
        require:true
    },
    title:{
        type:String,
        require:true
    },
    number:{
        type:Number,
        require:true
    },
    expire:{
        type:String,
        require:true
    },
    forW:{
        type:String,
        require:true
    },
    img:{
        type:String,
        require:true
    },
    link:{
        type:String,
        require:true
    },
    author:{
        type:String,
        require:true
    }
});


let Deals = module.exports = mongoose.model('Deals',DealsSchema);
