import React from 'react';
import { get, isArray, isNumber, isObject, isString, map, reduce } from 'lodash';

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
    // TODO: Add test for this throw. JEST YOU BETTER MAKE THIS EASY!
    const layoutObj = isString(layout) ? this.layouts[layout] : layout;
    if (!layoutObj) throw new Error('Invalid layout: ' + layout);
    return this.doRender_(layoutObj, null, viewModel);
  }

  /**
   * Recursively stitches together views for a given layout and view model.
   * This is the rendering method that actually "does work".
   * @param {!Object} layoutObj The layout we are rendering.
   * @param {?string} parentPath The current path within the layout that we are
   *     rendering, in lodash get() syntax, e.g. 'foo.$children.baz'. A null
   *     value indicates that viewModel is the root view model node.
   * @param {!Object|!Array} viewModel The (slice of) view model being rendered.
   * @return {!Array<!Object|undefined>} An array of JSX fragments.
   */
  doRender_(layoutObj, parentPath, viewModel) {
    return map(viewModel, (value, key) => {
      // If we've reached a leaf/scalar value, just return. No need to render.
      // TODO: May want to revist the leaf/scalar thing later. Can envision use
      // cases where you want to pass a string as the sole child to a component.
      if (!isArray(value) && !isObject(value)) return;
      const layoutPath = this.getLayoutPath_(parentPath, key);
      const layoutSlice = get(layoutObj, layoutPath);
      // If there's no layoutSlice for this key, just return. No need to render.
      if (!layoutSlice) return;
      const View = this.views[layoutSlice.$view];
      const data = this.getViewData_(value, layoutSlice);
      return (
        <View key={key} data={data} layoutPath={layoutPath}>
          {this.doRender_(layoutObj, layoutPath, value)}
        </View>
      );
    });
  }

  /**
   * Given a parentPath such as 'foo.$children.baz', will return a layout path
   * for the the current key, e.g. 'foo.$children.baz.herp' (for object keys) or
   * 'foo.$children.baz.$children' (for array keys).
   * @param {?string} parentPath
   * @param {string|number} key
   * @return {string}
   */
  getLayoutPath_(parentPath, key) {
    // If parentPath is null, viewModel (see doRender_) is the root node, so
    // return the key to create the first key in the layoutPath. E.g. if
    // viewModel is {foo: {}, bar: []} and key is 'foo', this will return 'foo'.
    if (!parentPath) return key;
    // TODO: Test deeper view model nesting. This is an untested code path.
    if (isString(key)) return `${parentPath}.${key}`;
    if (isNumber(key)) return `${parentPath}.$children`;
    // TODO: Test for this.
    throw new Error('Unknown viewModel key type: ' + key);
  }

  /**
   * Augments object values according to layoutSlice.$props mapping, if any.
   * @param {!Array|!Object} viewModel
   * @param {!Object} layoutSlice
   * @return {!Array|!Object}
   */
  getViewData_(viewModel, layoutSlice) {
    return layoutSlice.$props && isObject(viewModel) ?
        reduce(layoutSlice.$props, (data, viewPropKey, modelKey) => {
          data[viewPropKey] = data[modelKey];
          return data;
        }, viewModel) :
        viewModel ;
  }
}
