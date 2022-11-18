const express = require('express');
const methodOverride = require('method-override');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const newRoutes = require('./routes/newRoutes.js');
const userRoutes = require('./routes/userRoutes.js');
const groupRoutes = require('./routes/groupRoutes.js');
const Appointment = require('./models/appointment');
const appointment = require('./models/appointment');

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

//setup routing
app.get('/', (req, res)=>{
    if(req.session.user){        
        user = true;
        Appointment.find({$or: [{author: req.session.user}, {}]})
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
app.get('/:id', (req, res, next)=>{
    let id = req.params.id;
    if(!id.match(/^[0-9a-fA-F]{24}$/)) {
        let err = new Error('Invalid appointment id');
        err.status = 400;
        return next(err);
    }
    Appointment.findById(id)
    .then(appointment=>{
        if(appointment){
            user = req.session.user;
            return res.render('./view', {appointment, user});
        } else {
            let err = new Error('Cannot find a appointment with id ' + id);
            err.status = 404;
            next(err);
        }
    })
    .catch(err=>next(err))
});

app.use('/new', newRoutes);

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