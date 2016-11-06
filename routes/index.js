var express = require('express');
var router = express.Router();
const app = require('../lib').default;

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('loading');
});

router.get('/troll', function(req, res)  {
  res.render('main');
});

router.post('/troll', function(req, res) {
  app.troll( req.body ).done( msgs => {
    res.render('confirm', { messages: msgs });
  })
});

module.exports = router;
