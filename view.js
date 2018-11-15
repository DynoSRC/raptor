// This is currently psuedocode.

import _ from 'lodash';
import boring from 'protoceratops';

exports.View = class View {
  private static getViewModel_(name: string, data, clientId: string): Object {
    return _.get(boring, name)(data);
  }

  static getView(name: string, data: Object, clientId: string): boring.View {
    const view = boring.view();
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
