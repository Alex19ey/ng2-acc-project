const path = require('path');

const helpers = require('./config/helpers');


const options = {
    src: 'src',
    dist: 'dist',
    srcAbs: helpers.rootJoin('src'),
    distAbs: helpers.rootJoin('dist'),
    isAOT: helpers.hasNpmFlag('aot')
};

switch (process.env.NODE_ENV) {
    case 'prod':
    case 'production':
        options.env = 'production';
        module.exports = require('./config/webpack.prod')(options);
        break;
    case 'dev':
    case 'development':
    default:
        options.env = 'development';
        module.exports = require('./config/webpack.dev')(options);
}
