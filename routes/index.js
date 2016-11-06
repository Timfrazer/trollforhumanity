var express = require('express');
var router = express.Router();
const app = require('../lib').default;

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('main', { title: 'Express' });
});

router.post('/troll', function(req, res) {
  app.troll( req.body );
  res.send( req.body );
});

module.exports = router;
