const { IS_PRODUCTION } = process.env

import models from './models'
import carePackages from './carePackages'
import scheduler from './scheduler'

const substitute = () => {

  const hr = 1000 * 60 * 60

  return {

    troll: params => new Promise( (res, rej) => {
      let msgs = [
        { message: 'tim is a troll, bigly', time: new Date( Date.now() + hr ) },
        { message: 'shaun is also a troll, tremendously', time: new Date( Date.now() + 2 * hr ) }
      ]

      setTimeout( () => { res( msgs ) }, 500)
    })

  }
}

const hot = () => {

  return {

    troll: params => new Promise( (res, rej) => {
      models.makeUser( params )
        .then( user => carePackages.load( user ) )
        .then( user => scheduler.send( user ) )
        .done( user => res( user ) )
        .catch( console.err )
    })

  }
}

const api = IS_PRODUCTION === 'true' ? hot : substitute
export default api()
