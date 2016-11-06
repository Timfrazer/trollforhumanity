import cat from './cat'
import yak from './yak'
import fomo from './fomo'
const loaders = [ cat, yak, fomo ]

const hot = () => ({

  load: user => new Promise( (res, rej) => {
    // get user subscriptions
    let packages = Object.keys( user.activePackages() )
    let alreadySent = user.getSentQueue().map( msg => msg.uuid )

    // load each subscription with messages
    let queue = []
    packages.forEach( name => {
      switch( name ) {
        case 'cat':
          queue.push( cat.fetch() )
          break
        case 'yak':
          queue.push( cat.fetch() )
          break
        case 'fomo':
          queue.push( cat.fetch() )
          break
        default:
          break
      }
    } )
    // TODO
    // loaders.reduce( (acc, loader) => acc.concat( loader.fetchExcept( alreadySent ) ), queue )

    // console.log( `carepackage::loading ${queue[0].length} messages to user's queue` )
    user.addToQueue( queue[0] )
    // console.log( `carepackage::loaded ${user.getState().queue.length} messages to user` )
    
    // return user
    res( user )
  })

})

export default hot()
