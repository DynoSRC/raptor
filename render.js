const _ = require('lodash');
// const React = require('react'); // magic, not actual dep because reasons
const templates = require('./templates');

// function createReactClass(name) {
//   return React.createClass({
//     render() {
//       return templates.getTemplate(name)(this);
//     }
//   });
// }

// TODO: Make this dynamic.
// const reactClasses = {
//   ExampleSetView: createReactClass('ExampleSetView'),
//   ExampleView: createReactClass('ExampleView'),
// };

const Renderer = class Renderer {
  // TODO: Make a generator version of this for the joke.
  static async render(view, clientId, fragments=[]) {
    // If truthy, this is a boring View proto. We want the underlying view model
    // proto such as ExampleView or ExampleSetView.
    if (typeof view.hasView === 'function' && view.hasView()) {
      return await Renderer.render(view.getView(), clientId, fragments);
    }

    const name = view.getContainer().getContainerName();
    // The top-level view model does not render itself, but is a container for
    // other views.
    // TODO: Enum or instanceof. No magic strings.
    if (name !== 'Model') {
      const viewModel = view.toObject();
      // Add component templates to view model obj so that child components can
      // be rendered.
      // _.extend(viewModel, reactClasses);
      fragments.push(templates.getTemplate(name)(viewModel, {html: true}));
    }

    const childViews = view.getViewsList();
    if (childViews && childViews.length) {
      await Promise.all(childViews.map((view) => {
        return Renderer.render(view, clientId, fragments);
      }));
    }

    return fragments.join('\n\n');
  }
};

exports.Renderer = Renderer;
