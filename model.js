const container_pb = require('./protos/boring/lib/container_pb');
const model_pb = require('./protos/boring/raptor/model_pb');

exports.Model = class Model {
  static getModel(clientId) {
    // TODO: Figure out container_id scheme. A util should handle all container
    // manipulation. No real code should ever do this. Probs just hash the
    // container_name, which should always match the proto.
    // e.g.: Container.setContainer(boring.Model(), clientId);
    // or: Container.getContainer('Model', clientId);
    return new model_pb.Model({
      container: new container_pb.Container({
        containerId: '1234',
        containerName: 'Model',
        clientId: clientId,
      }),
    });
  }
};
