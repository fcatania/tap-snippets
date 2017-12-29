const express = require('express');
const app = express();
const controller = require('./controller');
const path = require('path');
const router = require('./router');

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
  next();
});

app.get('/', (req, res) => {
  res.send('server running');
});

app.use('/snippets', router);

app.listen(8080, () => {
  console.log('App running in port 8080');
})