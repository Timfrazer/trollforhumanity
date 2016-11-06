import api from '../api'

const hot = () => {

  const interval = 1000 * 60 // minute
  // const interval = 1000 * 2 // 2 second
  
  let count = 0
  const batchQty = 24

  const trigger = ( user, msgs ) => {
    const { phone, twitter } = user.getState()

    msgs.forEach( (msg, i) => {
      setTimeout( () => {

        api.send({ 
          type: 'sms',
          recipient: phone,
          message: msg,
          cb: console.log
        })

        api.send({ 
          type: 'tweet',
          recipient: twitter,
          message: msg,
          cb: console.log
        })

      }, interval * i )
    } )
  }

  return {

    schedule: user => new Promise( (res, rej) => {
      console.log( `scheduler::user queue length: ${user.getState().queue.length}` )
      let msgs = user.takeFromQueue( batchQty )

      trigger( user, msgs )
      res( msgs )
    })

  }

}

export default hot()
