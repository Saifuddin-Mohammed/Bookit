const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const appointmentSchema = new Schema({
    title: {type: String, required: [true, 'cannot be empty']},
    startTime: {type: String, require: [true]},
    endTime: {type: String, require: [true]},
    date: {type: String, require: [true]},
    priority: {type: String, require: [true]},
    group: {type: String, require: [false]},
    purpose: {type: String, require: [true]},
    author: {type: String, require: [true]}
});

module.exports = mongoose.model('Appointment', appointmentSchema);