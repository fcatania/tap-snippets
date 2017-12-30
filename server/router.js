var controller = require('./controller');
var router = require('express').Router();

const availableTechs = {
  'react': 1
};

let needToSendErrorResponse = (tech, res) => {
  if(availableTechs[tech] === undefined) {
    res.status(500).json({err: 'No technology with that name'});
    return true;
  } 
  return false;
}

router.get('/:tech', (req, res) => {
  let tech = req.params.tech;
  if(!needToSendErrorResponse(tech, res)) {
    controller.get(availableTechs[tech]).then((snippets) => {
      res.status(200).json(snippets);
    });
  }
});

router.post('/:tech', (req, res) => {
  let tech = req.params.tech;
  if(!needToSendErrorResponse(tech, res)) {
    controller.post(req, res, availableTechs[tech]).then((newSnippet) => {
      res.status(201).json(newSnippet);
    });
  }
});

module.exports = router;