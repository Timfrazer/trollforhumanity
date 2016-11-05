
// this is the substitute interface
function substitute() {

  return {

    send: function(phone, message, cb) {
      // on done, call cb with [err, statusMessage]
      setTimeout( function() {
        if (!phone || !message) {
          cb('missing phone or message', null)
        } else {
          cb(null, 'sent')
        }
      }, 500 )
    }

  }
}

// implement hot twilio stuff using the substitute interface
function twilio() {

}

// once done, replace this with twilio
export default substitute()
