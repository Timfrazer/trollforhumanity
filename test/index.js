import test from 'ava'
import app from '../lib'

let params = {
  sender: {
    name: 'jens',
    phone: '1234567890'
  },
  receiver: {
    name: 'wat',
    email: 'hello@hi.com'
  }
}

test(t => app.troll( params ).then( result => {
    t.truthy( result.length )
    t.true( typeof result[0].message === 'string' )
    t.true( result[0].time instanceof Date )
  })
)
