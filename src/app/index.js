const { IS_PRODUCTION } = process.env

const substitute = () => {

  return {
  }
}

const hot = () => {

  return {
  }
}

const api = IS_PRODUCTION === 'true' ? hot : substitute
export default api()
