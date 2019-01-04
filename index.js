import { importImages } from './src/utils/import-images'
require('./src/css/estilos.css')
require('./src/js/menu')


if (process.env.NODE_ENV !== 'production') {
    console.log('Looks like we are in development mode!');
}

importImages()