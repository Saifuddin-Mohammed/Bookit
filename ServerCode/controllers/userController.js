const session = require('express-session');
const User = require('../models/user');

exports.signup = (req, res, next)=>{
    user = req.session.user;
    res.render('./user/signup', {user});    
}

exports.login = (req, res)=>{
    user = req.session.user;
    res.render('./user/login', {user});
}

exports.create = (req, res, next)=>{
    
        let user = new User(req.body);
        user.save()
        .then(()=>{
            res.redirect('/user/login')
        })
        .catch(err=>{
            if(err.name === 'ValidationError'){
                res.redirect('/user/new');
            }
    
            if(err.code === 11000){
                res.redirect('/user/new');
            }
            next(err)
        })
    
};

exports.auth = (req, res, next)=>{
    let uname = req.body.uname;
    let password = req.body.password;
    User.findOne({userName: uname})
    .then(user=>{
        if(user){
            user.comparePassword(password)
            .then(result=>{
                if(result){
                    req.session.user = user._id;
                    res.redirect('/');
                }else{
                    console.log('Wrong password');
                    res.redirect('/user/login');
                }
            })
        } else {
            console.log('wrong email');
            res.redirect('/user/login');
        }
    })
    .catch(err=>next(err));
};

exports.signout = (req,res, next)=>{
    req.session.destroy(err=>{
        if(err){            
            return next(err)
        }            
        else{
            res.redirect('/');
        }            
    })
};