import React from 'react';
import Raptor from './raptor';
import renderer from 'react-test-renderer';

class UserList extends React.Component {
  render() {
    return <div className="user-list">{this.props.children}</div>;
  }
}

class UserItem extends React.Component {
  render() {
    const {data} = this.props;
    return (
      <div className="user-item">
        <div className="avatar">{data.name[0]}</div>
        <div className="primary">{data.name}</div>
        <div className="secondary">{data.secondary}</div>
      </div>
    );
  }
}

class TestApp extends React.Component {
  render() {
    return this.props.raptor.render();
  }
}

describe('raptor.views', () => {
  describe('addView()', () => {
    it('Adds a single view to raptor.views.', () => {
      const raptor = new Raptor();
      raptor.addView('UserList', UserList);
      raptor.addView('UserItem', UserItem);
      expect(raptor.views).toEqual({UserList, UserItem});
    });
  });

  describe('addViews()', () => {
    it('Adds multiple views to raptor.views.', () => {
      const raptor = new Raptor();
      raptor.addViews({UserList, UserItem});
      expect(raptor.views).toEqual({UserList, UserItem});
    });
  });
});

describe('raptor.layouts', () => {
  const Foo = {herp: 'derp'};
  const Bar = {derp: 'herp'};

  describe('addLayout()', () => {
    it('Adds a single layout to raptor.layouts.', () => {
      const raptor = new Raptor();
      raptor.addLayout('Foo', Foo);
      raptor.addLayout('Bar', Bar);
      expect(raptor.layouts).toEqual({Foo, Bar});
    });
  });

  describe('addLayouts()', () => {
    it('Adds multiple layouts to raptor.layouts.', () => {
      const raptor = new Raptor();
      raptor.addLayouts({Foo, Bar});
      expect(raptor.layouts).toEqual({Foo, Bar});
    });
  });
});

describe('raptor.render()', () => {
  it('Renders correct JSX from layout and view model.', () => {
    const raptor = new Raptor();
    raptor.addViews({UserList, UserItem});
    raptor.addLayout('Users', {
      contacts: {
        $view: 'UserList',
        $children: {
          $view: 'UserItem',
          $props: {phone: 'secondary'},
        },
      },
    });
    const fragment = raptor.render('Users', {
      contacts: [
        {id: '1', name: 'Foo Guy', phone: '(619) 555-7380'},
        {id: '2', name: 'Bar Guy', phone: '(858) 555-7380'},
        {id: '3', name: 'Herp Guy', phone: '(415) 555-7380'},
        {id: '4', name: 'Derp Guy', phone: '(650) 555-7380'},
      ],
    });
    const rendered = renderer.create(fragment);
    expect(rendered.toJSON()).toMatchSnapshot();
  });
});
