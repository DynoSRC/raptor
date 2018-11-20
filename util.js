const _ = require('lodash');

function capFirst(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

exports.hydrateProto = (proto, obj) => {
  _.each(obj, (v, k) => {
    const setter = 'set' + capFirst(k);
    // console.log('setter', setter);
    // console.log('value', v);
    //console.log('toObject?', v.toObject && v.toObject());
    // If truthy, this is a boring View proto. We want the underlying view model
    // proto such as ExampleView or ExampleSetView.
    const isBoringView = typeof v.hasView === 'function' && v.hasView();
    // console.log('isBoringView', isBoringView);
    proto[setter](isBoringView ? v.getView() : v);
  });
};
