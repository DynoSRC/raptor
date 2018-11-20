const _ = require('lodash');
const example_pb = require('./protos/boring/raptor/views/example_pb');
const util = require('./util');
const view_pb = require('./protos/boring/raptor/view_pb');

exports.View = class View {
  static getView(name, data, clientId) {
    const view = new view_pb.View();
    const viewModelClass = _.get(example_pb, name);
    const viewModel = new viewModelClass([['1234', name, clientId]]);
    util.hydrateProto(viewModel, data);
    view.setView(viewModel);
    return view;
  }
};
