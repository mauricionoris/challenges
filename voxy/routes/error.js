var express = require('express');
var router = express.Router();


/* error router*/
router.get('/', function(req, res, next) {
  res.render('error', { errorMessage: 'Some valid input is required' });
});

module.exports = router;
