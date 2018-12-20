const Raptor = require('./raptor');

describe('raptor.views', () => {
  const Foo = {herp: 'derp'};
  const Bar = {derp: 'herp'};

  describe('addView', () => {
    it('Adds a single view to raptor.views.', () => {
      const raptor = new Raptor();
      raptor.addView('Foo', Foo);
      raptor.addView('Bar', Bar);
      expect(raptor.views).toEqual({Foo, Bar});
    });
  });

  describe('addViews', () => {
    it('Adds multiple views to raptor.views.', () => {
      const raptor = new Raptor();
      raptor.addViews({Foo, Bar});
      expect(raptor.views).toEqual({Foo, Bar});
    });
  });
});

describe('raptor.layouts', () => {
  const Foo = {herp: 'derp'};
  const Bar = {derp: 'herp'};

  describe('addLayout', () => {
    it('Adds a single layout to raptor.layouts.', () => {
      const raptor = new Raptor();
      raptor.addLayout('Foo', Foo);
      raptor.addLayout('Bar', Bar);
      expect(raptor.layouts).toEqual({Foo, Bar});
    });
  });

  describe('addLayouts', () => {
    it('Adds multiple layouts to raptor.layouts.', () => {
      const raptor = new Raptor();
      raptor.addLayouts({Foo, Bar});
      expect(raptor.layouts).toEqual({Foo, Bar});
    });
  });
});
