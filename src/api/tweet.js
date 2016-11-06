const { IS_PRODUCTION, TWITTER_CONSUMER_KEY, TWITTER_CONSUMER_SECRET, TWITTER_ACCESS_TOKEN_KEY, TWITTER_ACCESS_TOKEN_SECRET } = process.env
const Twitter = require('twitter')

// this is the substitute interface
const substitute = () => ({

  send: (username, message, cb) => {
    // on done, call cb with [err, statusMessage]
    setTimeout( function() {
      if (!username || !message) {
        cb('missing username or message', null)
      } else {
        cb(null, `sub::tweet sent at ${ Date.now() }`)
      }
    }, 500 )
  }

})

// implement hot twitter stuff using the substitute interface
const  hot = (consumer_key, consumer_secret, access_token_key, access_token_secret) => {
  var client = new Twitter( { consumer_key, consumer_secret, access_token_key, access_token_secret } );

  return {
    send: ( usr, msg, cb ) => client.post(
      'statuses/update',
      { status: `@${ usr }: ${msg}` },
      ( err, tweet, res ) => {
        err ? cb( err ) : cb( null, `hot::tweet sent at ${ Date.now() }` )
    })
  }
}

const api = IS_PRODUCTION === 'true' ? hot : substitute
export default substitute(
  TWITTER_CONSUMER_KEY,
  TWITTER_CONSUMER_SECRET,
  TWITTER_ACCESS_TOKEN_KEY,
  TWITTER_ACCESS_TOKEN_SECRET
)
