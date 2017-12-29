const express = require('express');
const app = express();
const controller = require('./controller');
const path = require('path');

let availableTechs = {
  'react': 1
};

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
  next();
});

app.get('/', (req, res) => {
  res.send('server running');
});

app.get('/snippets/:tech', (req, res) => {
  let tech = req.params.tech;
  if(availableTechs[tech] === undefined) {
    res.status(500).json({err: 'No technology with that name'});
  } else {
    controller.get(availableTechs[tech]).then((snippets) => {
      res.status(200).json(snippets);
    });
  }
});

app.listen(8080, () => {
  console.log('App running in port 8080');
})