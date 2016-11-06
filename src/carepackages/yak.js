const seed = require('../../seeds/YakFacts.json').messages

const hot = () => ({
  fetch: () => {
    let ret = seed.map( arr => arr[0] )
    return ret
  }
})

export default hot()
