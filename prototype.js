const Model = require('./model').Model;
const Renderer = require('./render').Renderer;
const View = require('./view').View;

// getModel creates a raptor.Model proto and hydrates its container info.
const viewModel = Model.getModel();
// Hydrate some view model protos with dummy data.
viewModel.addViews(View.getView('ExampleSetView', {
  derp: 1234,
  herp: 'foobar',
  leftExample: View.getView('ExampleView', {countdown: 500}),
  middleExample: View.getView('ExampleView', {countdown: 1500}),
  rightExample: View.getView('ExampleView', {countdown: 2500}),
}));

Renderer.render(viewModel).then((jsxFragment) => {
  console.dir('jsxFragment', jsxFragment);
});
