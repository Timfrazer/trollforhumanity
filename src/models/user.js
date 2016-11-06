const accessor = state => ({

  getState: () => Object.assign( {}, state ),

})

const queueManager = state => {

  state.queue = []
  state.sentQueue = []

  return {
    addToQueue: msgs => {
      state.queue = state.queue.concat( msgs )
      return true
    },

    takeFromQueue: ( qty = 1 ) => {
      let ret = state.queue.splice( 0, qty )
      state.sentQueue = state.sentQueue.concat( ret )
      return ret
    },

    getSentQueue: () => [ ...state.sentQueue ],

    filterQueue: fn => {
      state.queue = state.queue.filter( fn )
      return true
    }
  }

}

/**
 * @param name {String}
 * @param options {Object<String>} contact information
 * @return {Object|Boolean} if success, you get an user, else a false
 */
const User = ( name, { email = '', phone = '', twitter = '' } = {} ) => {
  try {
    if ( !name ) { return false }
    // must give at least an email, phone, or twitter handle
    let test = [ email, phone, twitter ].reduce( ( acc, ele ) => acc + ele.length, 0 )
    if ( test === 0 ) { return false }
  } catch ( e ) {
    return false
  }

  let state = {
    name,
    email,
    phone,
    twitter,
    // TODO user should be initialised as unconfirmed.
    // currently the app doesn't have sms confirmation
    confirmed: true
  }

  return Object.assign(
    {},
    accessor( state ),
    queueManager( state )
  )
}

export default User
