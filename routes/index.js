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

router.get('/confirm', function(req, res)  {
  res.render('confirm');
});

router.get('/thankyouuu', function(req, res)  {
  res.render('thankyouuu');
});

router.post('/troll', function(req, res) {

  let params = {
    name: req.body.rec_name,
    options: {
      phone: req.body.rec_tel,
      twitter: req.body.rec_twitter,
    },
    packages: [ req.body.rec_package ]
  }

  // ( name, { email = '', phone = '', twitter = '' } )
  app.troll( params ).then( msgs => {
    res.render('confirm', { messages: JSON.stringify(msgs) });
  })

});

router.get('/log', function( req, res ) {
  res.send( 'get log' )
})

router.post('/log', function( req, res ) {
  console.log( req.body.rec_name )
  console.log( req.body.rec_email )
  console.log( req.body.rec_tel )
  console.log( req.body.rec_twitter )
  console.log( req.body.rec_package )
  res.send( 'ok' )
});

module.exports = router;
