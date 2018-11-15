// This is currently psuedocode.

import boring from 'protoceratops';
import jsx from 'magic';
import templates from 'magic';

exports.Renderer = class Renderer {
  static render(
      view: Object, clientId: string, fragment: jsx.JsxFragment):
      jsx.JsxFragment {
    // If truthy, this is a boring View proto. We want the underlying view model
    // proto such as ExampleView or ExampleSetView.
    if (view.view) {
      return Renderer.render(view.view, clientId, fragment);
    }

    fragment.append(templates.render(view));

    view.views.forEach((view) => {
      Renderer.render(view, clientId, fragment);
    });

    return fragment;
  }
};
