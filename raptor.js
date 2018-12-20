const _ = require('lodash');

class Raptor {
  constructor() {
    this.views = {};
    this.layouts = {};
  }

  addView(k, v) {
    this.views[k] = v;
  }

  addViews(views) {
    this.views = {...this.views, ...views};
  }

  addLayout(k, v) {
    this.layout[k] = v;
  }

  addLayouts(layouts) {
    this.layouts = {...this.layouts, ...layouts};
  }

  render(layout, viewModel) {
    const layoutObj = _.isObject(layout) ? layout : this.layouts[layout];
    if (!layoutObj) throw new Error('Invalid layout: ' + layout);

    // ...
  }
}

exports = new Raptor();
