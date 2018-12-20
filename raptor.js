// TODO: Would be great to remove this/all deps if possible. But what about JSX?
import _ from 'lodash';

export default class Raptor {
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
    this.layouts[k] = v;
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
