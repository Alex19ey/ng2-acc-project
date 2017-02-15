"use strict";

let http = require('http');
let https = require('https');



module.exports = function (app, config) {
    return createServer(app, config)
        .listen(config.port, config.host, function () {
            console.log(`
                \x1b[32m Express server ${config.host} is now live at port ${config.port}, 
                TLS is ${tlsIsActive(config.tls) ? 'enabled' : 'disabled'}, 
                production mode is ${process.env.NODE_ENV === 'production' ? 'enabled' : 'disabled'} \x1b[0m`
            );
        });
};


function createServer(app, config) {
    if (tlsIsActive(config.tls)) {
        return https.createServer(config.tls.options, app);
    }

    return http.createServer(app);
}

function tlsIsActive(tlsConfig) {
    let isEnabled = tlsConfig.isEnabled;
    let hasRequiredOptions = tlsConfig.options && tlsConfig.options.key && tlsConfig.options.cert;

    if (isEnabled && !hasRequiredOptions) throw new Error('required TLS options not provided');

    return isEnabled;
}