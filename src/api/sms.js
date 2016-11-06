const { IS_PRODUCTION, TWILIO_SID, TWILIO_AUTH, TWILIO_NUMBER } = process.env
import twilio from 'twilio'

// this is the substitute interface
function substitute() {

  return {

    send: function(phone, message, cb) {
      // on done, call cb with [err, statusMessage]
      setTimeout( function() {
        if (!phone || !message) {
          cb('missing phone or message', null)
        } else {
          cb(null, `sub::sms sent at ${ Date.now() }`)
        }
      }, 500 )
    }

  }
}

// implement hot twilio stuff using the substitute interface
function hot(sid, token, twilioNumber) {

  return {
    send: function(phone, message, cb) {
      const client = twilio( sid, token )

      let payload = {
        body: message,
        to: phone,
        from: twilioNumber
      }

     client.sendMessage( payload, (err, res) => {
       if ( err ) { cb( err ) }
       else { cb( null, `hot::sms sent at ${ Date.now() }` ) }
     } ) 
    }
  }
}

const api = IS_PRODUCTION === 'true' ? hot : substitute
export default hot( TWILIO_SID, TWILIO_AUTH, TWILIO_NUMBER )
