var express = require('express');
var bodyParser = require('body-parser')

var router = express();
router.use(bodyParser.urlencoded({ extended: true }));

var busrules = require('./lib/wordcounter')


/* router for wordcounter functionality */
router.post('/', function(req, res, next) {

   res.locals.inputText = req.body.enteredText;

   if (!busrules.checkcontent(res.locals.inputText )) {
      res.redirect('/err')
    }
    else {
      next();
    }
}, function(req, res, next) {
        var inputText = res.locals.inputText;
        var number_of_words = busrules.countwords(inputText);
        res.render('wordcounter', {
                               text: inputText
                             , q_words: number_of_words
                             , tokens: busrules.gettokens()
                    });
 });

module.exports = router;
