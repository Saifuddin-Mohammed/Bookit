const Appointment = require('../models/appointment');
const User = require('../models/user');
const Group = require('../models/group');

exports.index = (req, res, next)=>{
    if(req.session.user){
        let user = req.session.user;
        User.findById(user)
        .then(user=>{
            if(user){
                groupIds = Array.from(user.groups);
                Group.find().where('_id').in(groupIds)
                .then(groups=>{
                    res.render('./new/AddAppointment', {user, groups});
                })
                .catch(err=>next(err)) 
            } else {
                let groups = [];
                res.render('./new/AddAppointment', {user, groups});
            }               
        }) 
    } else {
        let user = null;
        let groups = [];
        res.render('./new/AddAppointment', {user, groups});
    } 
};

exports.new = (req, res, next)=>{
    let appointment = new Appointment(req.body);
    appointment.author = req.session.user;
    appointment.save() //save appointment
    .then(
        Group.findById(appointment.group) //get group by id
        .then(group=>{
            Group.findByIdAndUpdate({_id: appointment.group}, {$push: {appointments: appointment._id}})
            .then(group=>{
                let users = Array.from(group.accepted); //all users in group
                User.updateMany(
                    { _id: { $in: users } },
                    { $push: { appointments : appointment._id } },
                    {multi: true}
                ).then(res.redirect('/'))
                .catch();
            })
            .catch()            
        })
        .catch()
    )
    .catch(err=>next(err))
};

exports.id = (req, res, next)=>{
    let id = req.params.id;
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
};
