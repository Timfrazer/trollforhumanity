function substitute() {
  return {
    get: function ( type, qty, rejectList, cb ) {
      // TODO this func is incomplete, does not handle reject list
      qty = Number( qty )
      // make rejectList an optional argument
      if ( typeof rejectList === 'function' && !cb ) {
        cb = rejectList
        rejectList = []
      }

      let messages = {}
      let DB_QTY = 30

      // generate dummy
      for (let i = 0; i < DB_QTY; i++) {
        messages[i + 1] = `Sample message ${ Math.floor( Math.random() * 100 ) }`
      }


      // LOGIC


      let ret = []
      let keys = Object.keys( messages )

      for (let i = 0; i < qty; i++) {
        // get a random key
        let key = keys[ Math.floor( Math.random() * keys.length ) ]

        // if requesting more than we have
        if ( i >= DB_QTY ) { break }

        ret.push( messages[key] )
      }

      cb( null, { type: type, messages: ret } )
    }
  }
}

export default substitute()
