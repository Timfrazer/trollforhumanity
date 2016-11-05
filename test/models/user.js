import test from 'ava'
import User from '../../lib/models/user'

test('User model', t => {
  let formData = { name: 'a', email: 'b', phone: 'c', twitter: 'd' }
  let user = User( formData )

  t.truthy( user, 'should return something truthy' )
  t.false( user.showState().confirmed, 'default confirmed status should be false' )

});

