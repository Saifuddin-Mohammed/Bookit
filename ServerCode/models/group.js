const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const groupSchema = new Schema({
    groupName: {type: String, required: [true, 'cannot be empty']},
    invited: [{type: Schema.Types.ObjectId, ref: 'User'}],
    accepted: [{type: Schema.Types.ObjectId, ref: 'User'}],
    appointments: [{type: Schema.Types.ObjectId, ref: 'Event'}],
    author: {type: Schema.Types.ObjectId, ref:'User'},
    description: {type: String, require:[false]}
});

module.exports = mongoose.model('Group', groupSchema);