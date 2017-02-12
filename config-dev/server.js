"use strict";

const fs = require('fs');
const path = require('path');



module.exports =  {
    host: 'localhost',
    port: 3264,

    serveStatic: {  // entrust nodeJS to serve static files
        isEnabled: true,
        urlPath: '/static-files/'
    },

    tls: {  // use https module with tls encryption, otherwise http will be used instead
        isEnabled: false,
        options: {
            key: fs.readFileSync(path.join(__dirname, './../certs-dev/selfsigned.key')),
            cert: fs.readFileSync(path.join(__dirname, './../certs-dev/selfsigned.crt'))
        }
    },
    
    trustProxy: {
        isEnabled: false,
        adresses: []
    },

    compression: true
};