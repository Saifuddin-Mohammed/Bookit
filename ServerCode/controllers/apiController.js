const Event = require('../models/event');
const session = require('express-session');
const User = require('../models/user');
const Group = require('../models/group');
const mongoose = require('mongoose')

exports.index = (req,res)=>{
    let userId = req.session.user;
    if(userId){
        User.findById(userId).populate('appointments')
        .then(user=>{
            let events = user.appointments;
            res.send(events)
        })
    } else {
        res.status(400).send()
    }    
};

exports.newEvent = (req,res,next)=>{
    let r = req.body;
    let event = new Event(r);
    event.author = req.session.user;
    event.priority = req.body.priority;
    Group.findById(event.group)
    .then(group=>{
        let users = [];
        users = group.accepted;
        User.updateMany(
            { _id: { $in: users } },
            { $push: {appointments: event._id} },
            {multi: true}
        )
        .then(()=>{
            //update group
            Group.findByIdAndUpdate(event.group, {$push: {appointments: event._id}})
            .then(()=>{
                event.save();
                res.status = 200;
                res.send();
            })
            .catch(err=>next(err))            
        })
        .catch(err=>next(err))
    })
    .catch(err=>next(err))
};

exports.getUser = (req,res)=>{
    let userId = req.session.user;
    if(userId){
        User.findById(userId)
        .then(user=>{
            res.status(200)
            res.send(user)
        })
    } else {
        res.status(400)
        res.send()
    }
};

exports.newUser = (req,res,next)=>{
    let user = new User(req.body);
    user.save()
    .then(()=>{
        res.status(200).send()
    })
    .catch(err=>{
        if(err.name === 'ValidationError'){
            res.status(400).send()
        }

        if(err.code === 11000){
            res.status(400).send()
        }
        next(err)
    })
};

exports.login = (req, res)=>{
    let email = req.body.email;
    let password = req.body.password;
    User.findOne({email: email})
    .then(user=>{
        if(user){
            user.comparePassword(password)
            .then(result=>{
                if(result){
                    req.session.user = user._id;
                    res.status(200).send()
                }else{
                    res.status(400).send()
                }
            })
        } else {
            res.status(400).send()
        }
    })
    .catch(err=>next(err));
};

exports.logout = (req,res)=>{
    req.session.destroy(err=>{
        if(err){            
            res.status(400).send()
        }            
        else{
            res.status(200).send()
        }            
    })
}

exports.newGroup = (req,res, next)=>{
    let UID = req.session.user
    let group = new Group();
    group.groupName = req.body.groupName;
    group.description = req.body.description;
    group.author = req.session.user;
    let emails = req.body.emails; //get emails from response
    console.log    
    User.findById(UID)
    .then(user=>{
        emails = emails.replace(/\s/g, ''); //remove spaces
        emails = emails + ',' + user.email;
        let uniqueEmails = [];
        if(emails.length > 0){
            try{
                const emailArray = emails.split(',') //split emails at each ,
                uniqueEmails = [...new Set(emailArray)];
            }catch{
                let uniqueEmails = [];
                uniqueEmails[0] = emails;
            }             
        }
        let ids = [];
        let success = [];
        User.find().where('email').in(uniqueEmails) //find users in email array
        .then(users=>{
            users.forEach(user => {
                ids.push(user._id);
                success.push(user.email);
            });
            let failed = uniqueEmails.filter(x => !success.includes(x));
             if(failed.length > 0){
                 res.status(400).send("There was an error adding some users")
             } else {
                group.accepted = ids;
                User.updateMany(
                    { _id: { $in: ids } },
                    { $push: {groups: group._id} },
                    {multi: true}
                ).then(()=>{
                    group.save()
                    res.status(200).send()
                }).catch()
             }
         })
         .catch(err=>next(err));
    })
    .catch(err=>next(err))
}

exports.groupsAdmin = (req,res, next)=>{
    let userId = req.session.user;
    let userIdObj = mongoose.Types.ObjectId(userId)
    if(userId){
        Group.find().where('author').equals(userIdObj)
        .then(groups=>{
            res.send(groups);
        })
        .catch(err=>next(err))
    } else {
        res.status(400).send();
    }
}

exports.getGroups = (req,res, next)=>{
    let UID = req.session.user;
    if(UID){
        User.findById(UID).populate('groups')
        .then(user=>{
            res.send(user.groups)
        })
        .catch(err=>next(err))
    } else {
        res.status(400).send()
    }
}