const express = require('express');
const methodOverride = require('method-override');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const newRoutes = require('./routes/newRoutes.js');
const userRoutes = require('./routes/userRoutes.js');
const groupRoutes = require('./routes/groupRoutes.js');
const Appointment = require('./models/appointment');
const apiRoutes = require ('./routes/apiRoutes');
const User = require('./models/user');
const bp = require('body-parser');

//create app
const app = express();

//app variables
const uri = "mongodb+srv://Depoloyment:easypass@cluster0.rzhd7re.mongodb.net/?retryWrites=true&w=majority"
let port = 3001;
let host = 'localhost';
app.set('view engine', 'ejs');

app.use(bp.json());
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
    cookie:{maxAge: 24*60*60*1000}, //one hour
    store: new MongoStore({mongoUrl: uri})
}));

//setup routing
app.get('/', (req, res)=>{
    if(req.session.user){        
        user = true;
        User.findById(req.session.user)
        .then(user =>{
            let appointmentsIds = Array.from(user.appointments);
            Appointment.find().where("_id").in(appointmentsIds)
            .then(appointments=>{
                res.render('index', {user, appointments});
            })
            .catch()            
        })
        .catch()        
    } else {
        appointments = [];
        user = false;
        res.render('index', {user});    
    }    
});

//Get
app.get('/date', (req, res)=>{
    if(req.session.user){        
        user = true;
        Appointment.find({$or: [{author: req.session.user}, {}]}).sort({date:1})
        .then(appointments =>{
            res.render('index', {user, appointments});
        })
        .catch()        
    } else {
        appointments = [];
        user = false;
        res.render('index', {user});    
    }    
});


app.get('/test', (req,res)=>{
    res.render('testing');
})
app.get('/priority', (req, res)=>{
    if(req.session.user){        
        user = true;
        Appointment.find({$or: [{author: req.session.user}, {}]})
        .then(query =>{
                appointments = Array.from(query).sort(function(doc1, doc2){
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
            })
            res.render('index', {user, appointments});
        })
        .catch()        
    } else {
        appointments = [];
        user = false;
        res.render('index', {user});    
    }    
});

app.use('/api', apiRoutes);

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
