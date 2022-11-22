const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const appointmentSchema = new Schema({
    title: {type: String, required: [true, 'cannot be empty']},
    startTime: {type: String, require: [true]},
    endTime: {type: String, require: [true]},
    date: {type: Date, require: [true]},
    priority: {type: String, require: [true]},
    purpose: {type: String, require: [true]},
    group: {type: Schema.Types.ObjectId, ref:'Group'},    
    author: {type: Schema.Types.ObjectId, ref:'User'}
});

module.exports = mongoose.model('Appointment', appointmentSchema);