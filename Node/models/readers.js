//Schema for tasks Collection
var mongoose = require('mongoose');

var readerSchema = new mongoose.Schema({
    event_id: Number,
    id: Number,
    name: String,
    position: Number
  });

module.exports = mongoose.model('sportstimer', readerSchema);