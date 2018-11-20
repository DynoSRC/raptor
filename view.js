const _ = require('lodash');
// const grpc = require('grpc');
// const protoLoader = require('@grpc/proto-loader');

// const packageDefinition = protoLoader.loadSync(
//     `${__dirname}/node_modules/protoceratops/protos/raptor/view.proto`,
//     {longs: String, enums: String, defaults: true, oneofs: true});
// const viewProto = grpc.loadPackageDefinition(packageDefinition);

module.exports.View = class View {
  // TODO: How to load whole namespace and use _.get?
  static getViewModel_(name, data, clientId) {
    // const packageDefinition = protoLoader.loadSync(
    //     `${__dirname}/node_modules/protoceratops/protos/raptor/views/${name}.proto`,
    //     {longs: String, enums: String, defaults: true, oneofs: true});
    // const proto = grpc.loadPackageDefinition(packageDefinition);

    // // return _.get(protos, name)(data);
    // return new proto[name](data);
    return {};
  }

  static getView(name, data, clientId) {
    const view = viewProto.View();
    // TODO: Figure out container_id scheme. A util should handle all container
    // manipulation. No real code should ever do this. Probs just hash the
    // container_name, which should always match the proto name.
    // e.g.: Container.setContainer(boring.View(), clientId);
    // or: Container.getContainer('View', clientId);
    view.container.containerId = '1234';
    view.container.containerName = 'View';
    view.container.clientId = clientId;

    view.view = View.getViewModel_(name, data, clientId);

    return view;
  }
};
