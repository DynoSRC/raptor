// This is currently psuedocode.

module.exports.Model = class Model {
  static getModel(clientId) {
    const model = new proto.Model();
    // TODO: Figure out container_id scheme. A util should handle all container
    // manipulation. No real code should ever do this. Probs just hash the
    // container_name, which should always match the proto.
    // e.g.: Container.setContainer(boring.Model(), clientId);
    // or: Container.getContainer('Model', clientId);
    model.container.containerId = '1234';
    model.container.containerName = 'Model';
    model.container.clientId = clientId;
    return model;
  }
};
