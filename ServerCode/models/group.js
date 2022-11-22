const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const groupSchema = new Schema({
    groupName: {type: String, required: [true, 'cannot be empty']},
    author: {type: Schema.Types.ObjectId, ref:'User'},
    invited: [{type: Schema.Types.ObjectId, ref:'User'}],
    accepted: [{type: Schema.Types.ObjectId, ref:'User'}],
    appointments: [{type: Schema.Types.ObjectId, ref:'Appointment'}]
});

module.exports = mongoose.model('Group', groupSchema);