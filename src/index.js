const { IS_PRODUCTION } = process.env
import api from './api'
import app from './app'
import carePackages from './carePackages'
import db from './db'
import models from './models'
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

    troll: params => {
    }

  }
}

const api = IS_PRODUCTION === 'true' ? hot : substitute
export default api()
