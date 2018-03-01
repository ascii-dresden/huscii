const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const chalk = require('chalk');

const memberRoutes = require('./routes/member-route');

mongoose.Promise = require('bluebird');
mongoose.connect('mongodb://localhost:27017/huscii', {
    promiseLibrary: require('bluebird')
  })
  .then(() => console.log('Connection Succeeded.'))
  .catch((err) => console.error(err));


router.get('/', (req, res) => {
  res.send('Express RESTful API');
});


router.use('/members', memberRoutes);


module.exports = router;
