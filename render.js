const fs = require('fs');
const jsx = require('react-jsx');

const Renderer = class Renderer {
  static async getJsxTemplate_(view) {
    const name = Renderer.getTemplateName_(view);
    return await fs.readFile(`./${name}`, 'utf-8');
  }

  static getTemplateName_(view) {
    return (`${view.getContainer().getContainerName()}.jsx`);
  }

  // TODO: Make a generator version of this for the joke.
  static async render(view, clientId, fragment='') {
    // If truthy, this is a boring View proto. We want the underlying view model
    // proto such as ExampleView or ExampleSetView.
    if (view.view) {
      return await Renderer.render(view.view, clientId, fragment);
    }

    const template = await Renderer.getJsxTemplate_(view);
    const renderFn =
        jsx.server(template, {filename: Renderer.getTemplateName_(view)});

    fragment += renderFn(view, {html: true});

    await Promise.all(view.views.map((view) => {
      return Renderer.render(view, clientId, fragment);
    }));

    return fragment;
  }
};

exports.Renderer = Renderer;
