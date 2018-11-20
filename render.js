const fs = require('fs');
const jsx = require('react-jsx');

const Renderer = class Renderer {
  static async getJsxTemplate_(view) {
    return await fs.readFile(
        `./jsx/${view.getContainer().getContainerName()}.jsx`, 'utf-8');
  }

  // TODO: Make a generator version of this for the joke.
  static async render(view, clientId, fragment='') {
    // If truthy, this is a boring View proto. We want the underlying view model
    // proto such as ExampleView or ExampleSetView.
    if (typeof view.hasView === 'function' && view.hasView()) {
      return await Renderer.render(view.getView(), clientId, fragment);
    }

    // The top-level view model does not render itself, but is a container for
    // other views.
    // TODO: Enum or instanceof. No magic strings.
    if (view.getContainer().getContainerName() !== 'Model') {
      const template = await Renderer.getJsxTemplate_(view);
      const renderFn = jsx.server(template);
      fragment += renderFn(view.toObject(), {html: true});
    }

    const childViews = view.getViewsList();
    if (childViews && childViews.length) {
      await Promise.all(childViews.map((view) => {
        return Renderer.render(view, clientId, fragment);
      }));
    }

    return fragment;
  }
};

exports.Renderer = Renderer;
