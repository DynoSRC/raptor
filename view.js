const _ = require('lodash');
const example_pb = require('./protos/boring/raptor/views/example_pb');
const view_pb = require('./protos/boring/raptor/view_pb');

exports.View = class View {
  static getView(name, data, clientId) {
    const view = new view_pb.View();
    // TODO: Need util to hydrate data because bad API design by google. :|
    const viewModelClass = _.get(example_pb, name);
    const viewModel = new viewModelClass([['1234', name, clientId]]);
    view.setView(viewModel);
    return view;
  }
};
