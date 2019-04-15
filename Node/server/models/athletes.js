//Schema for readers Collection
var mongoose = require('mongoose');

var athleteSchema = new mongoose.Schema({
    id: Number,
    name: String,
    number: Number
}, { collection: 'athletes' });

module.exports = mongoose.model('athletes', athleteSchema);