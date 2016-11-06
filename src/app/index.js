const { IS_PRODUCTION } = process.env

const substitute = () => {
}

const hot = () => {
}

const api = IS_PRODUCTION === 'true' ? hot : substitute
export default api
