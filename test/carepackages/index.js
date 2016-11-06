import test from 'ava'
import CP from '../../lib/carepackages'

test.cb('get messages', t => {
  t.plan( 2 )

  CP.get( 'trump', 10, ( err, data ) => {
    if ( err ) { t.fail( err ); t.end() }

    t.true( data.messages.length === 10 ) 
    t.pass()
    t.end()
  })
})

test.cb('get too many messages', t => {
  t.plan( 2 )

  CP.get( 'trump', 40, ( err, data ) => {
    if ( err ) { t.fail( err ); t.end() }

    t.true( data.messages.length === 30 ) 
    t.pass()
    t.end()
  })
})

test.skip('reject list', t => {
  t.plan( 2 )

  let list = [ 1, 2, 3 ]

  CP.get( 'trump', 30, list, ( err, data ) => {
    if ( err ) { t.fail( err ); t.end() }

    t.true( data.messages.length === 27 ) 
    t.end()
  })
})
