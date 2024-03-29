import React from 'react';
import Raptor from './raptor';
import renderer from 'react-test-renderer';

class HelloWorld extends React.Component {
  render() {
    const {data} = this.props;
    return (
      <div className="hello-world" foo={data.foo}>
        {this.props.children}
      </div>
    );
  }
}

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
  it('Renders correct JSX from a simple layout and view model.', () => {
    const raptor = new Raptor();
    raptor.addViews({UserList, UserItem});
    raptor.addLayout('Users', {
      users: {
        $view: 'UserList',
        $children: 'UserItem',
      },
    });
    const fragment = raptor.render('Users', {
      users: [
        {id: '1', name: 'Foo Guy', secondary: '(619) 555-7380'},
        {id: '2', name: 'Bar Guy', secondary: '(858) 555-7380'},
        {id: '3', name: 'Herp Guy', secondary: '(415) 555-7380'},
        {id: '4', name: 'Derp Guy', secondary: '(650) 555-7380'},
      ],
    });
    const rendered = renderer.create(fragment);
    expect(rendered.toJSON()).toMatchSnapshot();
  });

  it('Maps model keys to view prop keys according to $props.', () => {
    const raptor = new Raptor();
    raptor.addViews({UserList, UserItem});
    raptor.addLayout('Users', {
      users: {
        $view: 'UserList',
        $children: {
          $view: 'UserItem',
          $props: {secondary: 'phone'},
        },
      },
    });
    const fragment = raptor.render('Users', {
      users: [
        {id: '1', name: 'Foo Guy', phone: '(619) 555-7380'},
        {id: '2', name: 'Bar Guy', phone: '(858) 555-7380'},
      ],
    });
    const rendered = renderer.create(fragment);
    expect(rendered.toJSON()).toMatchSnapshot();
  });

  it('Supports reducer functions for $props.', () => {
    const raptor = new Raptor();
    raptor.addViews({UserList, UserItem});
    raptor.addLayout('Users', {
      users: {
        $view: 'UserList',
        $children: {
          $view: 'UserItem',
          $props: {secondary: (data) => data.phones[0].number},
        },
      },
    });
    const fragment = raptor.render('Users', {
      users: [
        {id: '1', name: 'Foo Guy', phones: [{number: '(619) 555-7380'}]},
        {id: '2', name: 'Bar Guy', phones: [{number: '(858) 555-7380'}]},
      ],
    });
    const rendered = renderer.create(fragment);
    expect(rendered.toJSON()).toMatchSnapshot();
  });

  it('Renders deeply nested views OK.', () => {
    const raptor = new Raptor();
    raptor.addViews({HelloWorld});
    raptor.addLayout('Home', {
      heroCarousel: {
        $view: 'HelloWorld',
        carouselItems: {
          $view: 'HelloWorld',
          $children: {
            $view: 'HelloWorld',
            message: {
              $view: 'HelloWorld',
              $props: {foo: 'text'},
            },
          },
        },
      },
    });
    const fragment = raptor.render('Home', {
      heroCarousel: {
        foo: 'Hero Carousel',
        carouselItems: [
          {foo: 'Carousel Item 1', message: {text: 'Message 1'}},
          {foo: 'Carousel Item 2', message: {text: 'Message 2'}},
        ],
      },
    });
    const rendered = renderer.create(fragment);
    expect(rendered.toJSON()).toMatchSnapshot();
  });
});
