import test from 'ava'
import User from '../../lib/models/user'

test('User model', t => {
  let formData = { email: 'b', phone: 'c', twitter: 'd' }
  

  t.truthy( User( 'jens', formData ), 'should get an object when called correctly' )
  t.false( User( 'martin' ), 'should return false if missing contact details' ) 
  t.false( User( null, formData ), 'should return false if missing name' ) 
  // TODO currently the model defaults to creating confirmed users
  // t.false( user.getState().confirmed, 'default confirmed status should be false' )

})

test('Queue', t => {

  let user = User( 'sara', { email: 'abc' } )
  let list = [1, 2, 3]

  user.addToQueue( list )

  t.deepEqual( user.takeFromQueue(), [1] )
  t.deepEqual( user.takeFromQueue( 2 ), [2, 3] )
  t.true( user.takeFromQueue().length === 0 )

  t.deepEqual( user.getSentQueue(), list )

  user.addToQueue( list )
  user.filterQueue( ele => ele >= 2 )
  
  t.deepEqual( user.takeFromQueue( 2 ), [2, 3] )
  t.deepEqual( user.takeFromQueue( 1 ), [] )

})
