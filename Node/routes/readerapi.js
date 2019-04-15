const express = require('express');
const router = express.Router();

var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

var Readers = require('../models/readers.js');
mongoose.connect('mongodb://localhost:27017/sportstimer', { promiseLibrary: require('bluebird') })
  .then(() =>  console.log('mongoose connection succesful'))
  .catch((err) => console.error(err));


// Error handling
const sendError = (err, res) => {
    response.status = 501;
    response.message = typeof err == 'object' ? err.message : err;
    res.status(501).json(response);
};

// Response handling
let response = {
    status: 200,
    data: [],
    message: null
};


//Get tasks
router.get('/getreaders', (req, res) => {
    Readers.find(function (err, data) {
	  if (err) return sendError(err);
	  response.data = data;
        res.json(response);
	  });
});

//Get task for Id
router.get('/getTaskforId', (req, res) => {
    Readers.findById(req.query.index,function (err, data) {
	  if (err) return sendError(err);
	  response.data = data;
        res.json(response);
	  });
});

module.exports = router;