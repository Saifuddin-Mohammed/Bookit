const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const groupSchema = new Schema({
    groupName: {type: String, required: [true, 'cannot be empty']},
    invited: {type: Array, require: [false]},
    accepted: {type: Array, require:[false]},
    appointments: {type: Array, require:[false]}
});

module.exports = mongoose.model('Group', groupSchema);