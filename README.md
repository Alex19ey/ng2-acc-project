# Angular 2 test project


### How to start
1. Create copy of 'config-dev' folder (which contain default config)
   and name it as 'config'.
2. `npm run install:all`
3. `npm run build:prod`
4. `npm run server:prod`


### How to configure
In config/server.js you can change port and domain name(IP). <br>

It is preferable that you use reverse proxy(for example NGINX) and
entrust it with serving static files and/or handle TLS. <br>
For this reason in config/server.js file you can disable handling
static files and/or TLS by node. <br>

Still, if you want to use TLS and/or serve static files by node you can
configure it in config/server.js. <br>

For development purposes you can use self-signed certificate for localhost
in 'certs-dev' folder <br>


### Update 30.01.17