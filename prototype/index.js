const Model = require('../model').Model;
// Do I need to require this just for side effects? What's the right pattern
// to use here?
const Renderer = require('./renderer').Renderer;
const View = require('../view').View;
const injecture = require('injecture');

// TODO: Use injecture.getInstanceByInterface.
const rendererClass = injecture.getKeysByInterface('raptor.renderer')[0];
const renderer = injecture.get(rendererClass);

// getModel creates a raptor.Model proto and hydrates its container info.
const viewModel = Model.getModel();
// Hydrate some view model protos with dummy data.
viewModel.setViewsList([View.getView('ExampleSetView', {
  derp: 1234,
  herp: 'foobar',
  leftExample: View.getView('ExampleView', {foobar: 'abcd', countdown: 500}),
  middleExample: View.getView('ExampleView', {foobar: 'efgh', countdown: 1500}),
  rightExample: View.getView('ExampleView', {foobar: 'ijkl', countdown: 2500}),
})]);

// Calling toObject directly on something with an Any field produces this error:
// TypeError: msg.getValue_asB64 is not a function
// This is a problem, and the problem might be proto "Any" type is just dumb.
console.log(
    'viewModel JSON:', viewModel.getViewsList()[0].getView().toObject());

renderer.render(viewModel).then((htmlFragment) => {
  console.log('rendered HTML fragment:', typeof htmlFragment, htmlFragment);
});
