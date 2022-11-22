const Appointment = require('../models/appointment');
const User = require('../models/user');
const Group = require('../models/group');

//get groups to render into form
exports.index = (req, res, next)=>{
    let userId = req.session.user;
    if(userId){
        User.findById(userId).populate('groups')
        .then(userObj=>{
            console.log(userObj);
            res.render('./new/AddAppointment', {userObj});
        })
        .catch(err=>next(err));
    } else {
        res.render('./new/AddAppointment');
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
    .catch(err=>next(err));
};
