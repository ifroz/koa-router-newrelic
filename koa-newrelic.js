'use strict';

const _ = require('lodash');
const newrelic = require('newrelic');

module.exports = function middlewareFactory(routerInstance, cfg) {
  cfg = _.defaults(cfg || {}, {
    ctrlFormat: true
  });
  return function *(next) {
    try {
      yield next;
    } catch (err) {
      newrelic.noticeError(err);
    } finally {
      let str = cfg.ctrlFormat ? `${this.url.split('?')[0]}` : `${this.url.split('?')[0]}`.slice(1);
      newrelic[cfg.ctrlFormat ? 'setControllerName' : 'setTransactionName'](str);
    }
  };
};
