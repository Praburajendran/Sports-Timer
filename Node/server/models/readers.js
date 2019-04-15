//Schema for readers Collection
var mongoose = require('mongoose');

var readerSchema = new mongoose.Schema({
    event_id: Number,
    id: Number,
    name: String,
    position: Number
}, { collection: 'readers' });

module.exports = mongoose.model('readers', readerSchema);