import test from 'ava'
import api from '../../lib/api'

let msg = {
  type: 'tweet',
  recipient: 'wat',
  message: 'hello'
}

test.cb('sending message', t => {
  t.plan( 1 )

  api.send({
    ...msg,
    cb: ( err, msg ) => {
      if ( err ) { t.fail( err ) }
      t.pass( msg )
      t.end()
    }
  })

})

test.cb('send message missing data', t => {
  t.plan( 1 )

  api.send({
    ...msg,
    message: null,
    cb: ( err, msg ) => {
      if ( err ) { t.fail( err ) }
      t.pass( msg )
      t.end()
    }
  })

})

test.cb('send message missing data', t => {
  t.plan( 1 )

  api.send({
    ...msg,
    recipient: null,
    cb: ( err, msg ) => {
      if ( err ) { t.fail( err ) }
      t.pass( msg )
      t.end()
    }
  })

})

test.cb('send message missing type', t => {
  t.plan( 1 )

  api.send({
    ...msg,
    type: null,
    cb: ( err, msg ) => {
      if ( err ) { t.fail( err ) }
      t.pass( msg )
      t.end()
    }
  })

})
