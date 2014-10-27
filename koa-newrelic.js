'use strict';

var _ = require('lodash');
var newrelic = require('newrelic');

module.exports = function middlewareFactory(routerInstance, cfg) {
  var cfg = _.defaults(cfg || {}, {
    ctrlFormat: true
  });
  return function *(next) {
    var str = _(routerInstance.match(this.url.split('?')[0])).
        pluck('route').pluck('path').join(' ').replace(/\/+/g,'/').slice(1);
    newrelic[cfg.ctrlFormat ? 'setControllerName' : 'setTransactionName'](str);
    yield next;
  }
};
