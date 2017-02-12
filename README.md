# Angular 2 test project


### How to start
1. Create copy of 'config-dev' folder (which contain default config)
   and name it as 'config'. You can change it for your needs.
2. `npm start`


### How to configure
In config/server.js you can change port and domain name(IP). <br>

Often it is preferable to use reverse proxy (e.g. NGINX) and
entrust it with serving static files and/or handle TLS. <br>
For this reason in config/server.js file you can disable handling
static files and/or TLS by node. <br>

Still, if you don't want to use reverse proxy you can configure
TLS and/or serve static files in config/server.js. <br>

For development purposes you can use self-signed certificate for localhost
in 'certs-dev' folder <br>


### Requirements
- `Node.js 6+`
- `npm 3+`