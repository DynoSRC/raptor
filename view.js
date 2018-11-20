const _ = require('lodash');
const container_pb = require('./protos/boring/lib/container_pb');
const example_pb = require('./protos/boring/raptor/views/example_pb');
const view_pb = require('./protos/boring/raptor/view_pb');

exports.View = class View {
  static getView(name, data, clientId) {
    // TODO: Figure out container_id scheme. A util should handle all container
    // manipulation. No real code should ever do this. Probs just hash the
    // container_name, which should always match the proto name.
    // e.g.: Container.setContainer(boring.View(), clientId);
    // or: Container.getContainer('View', clientId);
    return view_pb.View({
      container: new container_pb.Container({
        containerId: '1234',
        containerName: 'View',
        clientId: clientId,
        view: new _.get(example_pb, name)(data),
      }),
    });
  }
};
