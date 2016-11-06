import User from './user'

const makeUser = params => {

  let user = User( params.name, params.options )
  params.packages.forEach( pkg => user.addPackage( pkg ) )
  return user
}

export default {
  makeUser
}
