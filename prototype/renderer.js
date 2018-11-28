const injecture = require('injecture');
const pug = require('pug');

// TODO: Raptor should handle the concept of dumb child views, not your
// renderer. Give people option of JSON vs. proto consumption.
const Renderer = class Renderer {
  // Your raptor.renderer interface must implement a render() method. It accepts
  // a View proto. Dumb child views are recursively rendered.
  // TODO: Make a generator version of this for the joke.
  async render(view, clientId, fragments=[]) {
    // If truthy, this is a boring View proto. We want the underlying view model
    // proto such as ExampleView or ExampleSetView.
    if (typeof view.hasView === 'function' && view.hasView()) {
      return await this.render(view.getView(), clientId, fragments);
    }

    const name = view.getContainer().getContainerName();
    // The top-level view model does not render itself, but is a container for
    // other views.
    // TODO: Enum or instanceof. No magic strings.
    if (name !== 'Model') {
      fragments.push(
          pug.renderFile(`prototype/templates/${name}.pug`, view.toObject()));
    }

    const childViews = view.getViewsList();
    if (childViews && childViews.length) {
      await Promise.all(childViews.map((view) => {
        return this.render(view, clientId, fragments);
      }));
    }

    return fragments.join('\n\n');
  }
};

injecture.registerClass(Renderer, {interfaces: ['raptor.renderer']});
exports.Renderer = Renderer;
