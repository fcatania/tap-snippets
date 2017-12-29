var controller = require('./controller');
var router = require('express').Router();

const availableTechs = {
  'react': 1
};

router.get('/:tech', (req, res) => {
  let tech = req.params.tech;
  if(availableTechs[tech] === undefined) {
    res.status(500).json({err: 'No technology with that name'});
  } else {
    controller.get(availableTechs[tech]).then((snippets) => {
      res.status(200).json(snippets);
    });
  }
});

module.exports = router;