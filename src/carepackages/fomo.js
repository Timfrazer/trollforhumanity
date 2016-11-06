const seed = require('../../seeds/Fomo.json').messages

const hot = () => ({
  fetch: () => {
    let ret = seed.map( arr => arr[0] )
    return ret
  }
})

export default hot()
