// This is currently psuedocode.

import Model from './model';
import Renderer from './render';
import View from './view';

// getModel creates a raptor.Model proto and hydrates its container info.
const viewModel = Model.getModel();
// Hydrate some view model protos with dummy data.
viewModel.views.add(View.getView('views.ExampleSetView', {
  derp: 1234,
  herp: 'foobar',
  left_example: View.getView('views.ExampleView', {countdown: 500}),
  middle_example: View.getView('views.ExampleView', {countdown: 1500}),
  right_example: View.getView('views.ExampleView', {countdown: 2500}),
}));

const jsxFragment = new Renderer.render(viewModel);

console.dir('jsxFragment', jsxFragment);
