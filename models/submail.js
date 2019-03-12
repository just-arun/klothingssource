let mongoose = require('mongoose');
let EMailSchema = mongoose.Schema({
    email:{
        type:String,
        require:true
    }
});

let EMail = module.exports = mongoose.model('EMail',EMailSchema);
