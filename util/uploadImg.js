let multer  = require('multer');
let path = require('path');

const storage = multer.diskStorage({
    destination: './public/assets/uploads',
    filename: (req,file,cb)=>{
        cb(null,file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});
// upload variable
const upload = multer({
    storage: storage
}).array('image',4);


module.exports = upload;