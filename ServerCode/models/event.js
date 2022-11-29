const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const eventSchema = new Schema({
    title: {type: String, required: [true, 'cannot be empty']},
    start: {type: Date, required: [true, 'cannot be empty']},
    end: {type: Date, required: [true, 'cannot be empty']},
    group: {type: Schema.Types.ObjectId, ref: 'Group', required: [true, "Must be part of a group"]},
    priority: {type: String, required: [true]},
    author: {type: Schema.Types.ObjectId, ref: 'User', required: [true, "Must have an author group"]},
    description: {type: String, required: [false]}
})

module.exports = mongoose.model('Event', eventSchema);