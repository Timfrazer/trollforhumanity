import test from 'ava'
import sender from '../../lib/api/tweet'

test.cb('sending message', t => {
  t.plan( 1 )

  sender.send('someuser123', 'hello', function( err, msg ) {
    if ( err ) { t.fail( err ) }
    t.pass( msg )
    t.end()
  })

})

test.cb('send message missing data', t => {
  t.plan( 1 )

  sender.send(null, 'hi', function( err, msg ) {
    if ( err ) { t.pass( err ) }
    else { t.fail() }
    t.end()
  })

})

test.cb('send message missing data', t => {
  t.plan( 1 )

  sender.send('jon', null, function( err, msg ) {
    if ( err ) { t.pass( err ) }
    else { t.fail() }
    t.end()
  })

})
