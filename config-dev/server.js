"use strict";

let fs = require('fs');
let path = require('path');



module.exports =  {
    host: 'localhost',
    port: 3264,

    serveStatic: {  // entrust nodeJS to serve static files
        active: true,
        urlPath: '/static-files/'
    },

    tls: {  // use https module with tls encryption, otherwise http will be used instead
        active: false,
        options: {
            key: fs.readFileSync(path.join(__dirname, './../certs/selfsigned.key')),
            cert: fs.readFileSync(path.join(__dirname, './../certs/selfsigned.crt'))
        }
    }
};