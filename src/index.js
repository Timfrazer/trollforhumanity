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

const fakeMsg = [
  { message: 'you are a troll, bigly', time: new Date( Date.now() ) },
  { message: 'you are a tremendous troll', time: new Date( Date.now() ) }
]

const hot = () => {

  return {

    troll: params => new Promise( (res, rej) => {
      let user = models.makeUser( params )
      carePackages.load( user )
      scheduler.schedule( user )
      
      res( fakeMsg )
    })
  }
}


// const api = IS_PRODUCTION === 'true' ? hot : substitute
export default hot()
