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
    loaders.reduce( (acc, loader) => acc.concat( loader.fetch() ), queue )
    // TODO
    // loaders.reduce( (acc, loader) => acc.concat( loader.fetchExcept( alreadySent ) ), queue )

    user.addToQueue( queue )
    
    // return user
    res( user )
  })

})

export default substitute()
