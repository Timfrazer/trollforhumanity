import user from './user'

const makeUser = params => new Promise( (res, rej) => {
  let user = User( params )
  params.packages.forEach( pkg => user.addPackage( pkg ) )
  res( user )
})

export default {
  makeUser
}
