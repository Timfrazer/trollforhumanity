function accessor( state ) {
  return {
    showState: () => Object.assign( {}, state ),
    setState: (key, data) => state[key] = data
  }
}

const User = ({ name, email, phone, twitter }) => {
  let state = {
    name,
    email,
    phone,
    twitter,
    messageQueue: [],
    confirmed: false
  }

  return Object.assign( {}, accessor( state ) )
}

export default User
