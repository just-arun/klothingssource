let express = require('express');
// let mongoose = require('mongoose');
let bodyParser = require('body-parser');
// let expressLayouts = require('express-ejs-layouts');
let path = require('path');
let session = require('express-session');
let passport = require('passport');
let expressValidator = require('express-validator');
let flash = require('connect-flash');

let { ensureAuthenticated } = require('./config/auth');




let db = require('./config/db');
db.on('error',err=>console.log(err));
db.once('open',()=>console.log('db connected...'));




let app = express();


app.set('view engine', 'ejs');
app.set('views',path.join(__dirname,'views'));
app.use(express.static(path.join(__dirname,'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

//{{ ==============
// express session middleware
app.use(session({
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: true,
    // cookie: { secure: true }
}));
//===============}}

//{{ ===========================
// express messages middleware
app.use(require('connect-flash')());
app.use(function (req, res, next) {
  res.locals.messages = require('express-messages')(req, res);
  next();
});
// ===========================}}

//{{=================
// express validator middleware

app.use(expressValidator({
    errorFormatter: function(param, msg, value) {
        let namespace = param.split('.')
        , root = namespace.shift()
        , formParam = root;

        while (namespace.length) {
            formParam += '['+namespace.shift()+']';
        }
        return {
            param  : formParam,
            msg    : msg,
            value  : value
        };
    }
}));

//=================}}
app.get('/admin',ensureAuthenticated,(req,res)=>{
    res.render('login');
});





// passport config
require('./config/passport')(passport);
app.use(passport.initialize());
app.use(passport.session());


// flash middle wear
app.use(flash());



app.get('/admin/users/api/dashboard',ensureAuthenticated,(req,res)=>{
    res.render('dashboard');
});

let deals = require('./routes/dealsR');
let mens = require('./routes/mensR');
let womens = require('./routes/womensR');
let accessories = require('./routes/accessories');
let user = require('./routes/user');
let sendData = require('./routes/sendData');
let mails = require('./routes/mailR');
let coupens = require('./routes/coupensR');
let blog = require('./routes/blog');
app.use('/admin/users/api/mens',mens);
app.use('/admin/users/api/womens',womens);
app.use('/admin/users/api/accessories',accessories);
app.use('/admin/users',user);
app.use('/client/api/request/data',sendData);
app.use('/admin/users/api/email',mails);
app.use('/admin/users/api/deals',deals);
app.use('/admin/users/api/coupens',coupens);
app.use('/blog',blog);


let PORT = process.env.PORT || 8000;

app.listen(PORT,()=>console.log(`lictening to port ${PORT}...`));

