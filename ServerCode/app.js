const express = require('express');
const methodOverride = require('method-override');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const newRoutes = require('./routes/newRoutes.js');
const userRoutes = require('./routes/userRoutes.js');
const groupRoutes = require('./routes/groupRoutes.js');
const User = require('./models/user');

//create app
const app = express();

//app variables
const uri = "mongodb+srv://Vulpire:Kona1281-@cluster0.rzhd7re.mongodb.net/?retryWrites=true&w=majority"
let port = 3000;
let host = 'localhost';
app.set('view engine', 'ejs');

//conenct to db and start server
mongoose.connect(uri,{useNewUrlParser: true, useUnifiedTopology: true})
.then(()=>{
    app.listen(port, host, ()=>{
        console.log('Server is running on port', port);
    });
})
.catch(err=>console.log(err.message));

//middleware
app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));
app.use(methodOverride('_method'));

app.use(session({
    secret: 'notsecure',
    resave: false,
    saveUninitialized: false,
    cookie:{maxAge: 60*60*1000}, //one hour
    store: new MongoStore({mongoUrl: uri})
}));

app.use((req, res, next) => {
    res.locals.user = req.session.user||null;
    next();
});

//setup routing

//Get user index: if logged in get user appointments and pass to be rendered
app.get('/', (req, res)=>{
    let userId = req.session.user;
    if(userId){
        User.findById(userId).populate('appointments')
        .then(userObj=>{
            res.render('index', {userObj});
        })
        .catch(err=>next(err));
    } else {
        res.render('index'); //diplay index with no database search
    }
});

//Get index sorted by date
app.get('/date', (req, res)=>{
    let userId = req.session.user;
    if(userId){
        User.findById(userId).populate('appointments')
        .then(userObj=>{
            let sorted = userObj.appointments.sort(
                function(doc1, doc2){
                    let date1 = new Date(doc1.date);
                    let date2 = new Date(doc2.date);
                    return date1-date2;
                }
            )
            userObj.appointments = sorted;
            res.render('index', {userObj});
        })
        .catch(err=>next(err));
    } else {
        res.render('index'); 
    }
});

app.get('/priority', (req, res)=>{
    let userId = req.session.user;
    if(userId){
        User.findById(userId).populate('appointments')
        .then(userObj=>{
            let sorted = userObj.appointments.sort(
                function(doc1, doc2){
                    if(doc1.priority === 'High'){
                        val1 = 3;
                    } else if (doc1.priority === 'Medium'){
                        val1 = 2;
                    } else if(doc1.priority === 'Low'){
                        val1 = 1;
                    }    
                    if(doc2.priority === 'High'){
                        val2 = 3;
                    } else if (doc2.priority === 'Medium'){
                        val2 = 2;
                    } else if(doc2.priority === 'Low'){
                        val2 = 1;
                    }
                    return val2-val1;
                }
            )
            userObj.appointments = sorted;
            res.render('index', {userObj});
        })
        .catch(err=>next(err));
    } else {
        res.render('index');  
    }
});

app.use('/apt', newRoutes);

app.use('/user', userRoutes);

app.use('/group', groupRoutes);

/*
app.use((req, res, next) => {
    let err = new Error('The server cannot locate ' + req.url);
    err.status = 404;
    next(err);
});

app.use((err, req, res, next)=>{
    console.log(err.stack);
    if(!err.status) {
        err.status = 500;
        err.message = ("Internal Server Error");
    }

    res.status(err.status);
    res.render('error', {error: err});
});
*/
