export const importImages = image => {
    let result = image
    const webpackContext = require.context('../assets/images/', false, /\.(png|jpe?g|svg)$/)
    const WEBPACK_KEYS = webpackContext.keys()
    if (image) {
        result = webpackContext(WEBPACK_KEYS.find(element => element === image)) || image
    }
    return result
}