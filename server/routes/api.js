const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const chalk = require('chalk');

mongoose.Promise = require('bluebird');
mongoose.connect('mongodb://localhost:27017/huscii', {
    promiseLibrary: require('bluebird')
  })
  .then(() => console.log('Connection succesful'))
  .catch((err) => console.error(err));


router.get('/', (req, res) => {
  res.send('Express RESTful API');
});




for (var key of router.stack) {
  var path = key.route.path;
  var method = key.route.methods;

  if (method.get) {
    console.log(chalk`{cyan get} ${path}`);
  } else if (method.post) {
    console.log(chalk`{orange post} ${path}`);
  } else if (method.put) {
    console.log(chalk`{red put} ${path}`);
  } else if (method.patch) {
    console.log(chalk`{yellow patch} ${path}`);
  } else if (method.delete) {
    console.log(chalk`{red delete} ${path}`);
  }
}


module.exports = router;
