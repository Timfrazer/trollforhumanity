const { IS_PRODUCTION } = process.env
import tweet from './tweet'
import sms from './sms'

const substitute = () => ({
  send: ( { type, recipient, message, cb } ) => {
    setTimeout( () => { cb( null, 'all sent' ) }, 500 )
  }
})

const hot = () => {
  return {
    send: ( { type, recipient, message, cb } ) => {
      switch ( type ) {
        case 'tweet':
          tweet( recipient, message, cb )
          break
        case 'sms':
          sms( recipient, message, cb )
          break
        default:
          cb( 'API::type not recognised' )
          break
      }
    }
  }
}

const api = IS_PRODUCTION === 'true' ? hot : substitute
export default api()
