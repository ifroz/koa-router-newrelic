# koa-router-newrelic

``koa-router-newrelic`` sets the transation name(s) matched by ``koa-router``.

## Installation

    npm install koa-router-newrelic

koa-router is patched with the app.getRouter() router, which is used to tap into the koa-router instance:

    npm install git://github.com/ifroz/koa-router.git


## Usage

    var app = koa();
    app.use(require('koa-router-newrelic')(app));