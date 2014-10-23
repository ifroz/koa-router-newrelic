'use strict';

var _ = require('lodash');
var newrelic = require('newrelic');

module.exports = function middlewareFactory(routerInstance) {
  return function *(next) {
    var str = _(routerInstance.match(this.url)).
        pluck('route').pluck('path').join(' ').replace(/\/+/g,'/');
    newrelic.setTransactionName(str);
    yield next;
  }
};
