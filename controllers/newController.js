const newM = require('../models/new');
const Appointment = require('../models/appointment');

exports.index = (req, res, next)=>{
    user = req.session.user;
    res.render('./new/AddAppointment', {user});
};

exports.new = (req, res, next)=>{
    let appointment = new Appointment(req.body);
    appointment.author = req.session.user;
    appointment.save()
    .then(res.redirect('/'))
    .catch(err=>next(err));
};