const _ = require('lodash');

function capFirst(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

exports.hydrateProto = (proto, obj) => {
  _.each(obj, (v, k) => {
    const setter = 'set' + capFirst(k);
    if (typeof v !== 'object') { // temp/debug
      proto[setter](v);
    }
  });
};
