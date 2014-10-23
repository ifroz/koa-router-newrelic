'use strict';

var _ = require('lodash');
var newrelic = require('newrelic');

module.exports = function middlewareFactory(app) {
  return function *(next) {
    var str = _(app.getRouter().match(this.url)).
        pluck('route').pluck('path').join(' ').replace(/\/+/g,'/');
    newrelic.setTransactionName(str);
    yield next;
  }
};
