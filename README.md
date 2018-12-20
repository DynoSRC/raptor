# raptor
A JSX layout engine.

Raptor is intended for use with the boring framework, but can be used by itself.

## Usage

TL;DR: Configure raptor with knowledge of your views and view model hierchy
("layout"). Then give it a JSON blob of view models and it will stitch together
the appropriate JSX for you.

### 1. Tell raptor about your views.

```js
raptor.addViews({FooView, BarView});
```

### 2. Tell raptor about your layout for each page/route/container.

These are only pages/routes/containers by convention. Strictly speaking, they
are simply named layouts.

```js
raptor.addLayout('Home', {
  // View model key.
  contacts: {
    // View to use for this view model key.
    $view: 'RaptorList',
    // This is a list key, so we need to also specify child views.
    $children: 'RaptorUserItem',
  },
});
```

TODO: Allow layouts to be nested/composed via the `$layout` key.

### 3. Tell raptor to render a given page with a given (hydrated) view model.

```js
raptor.render('Home', {
  contacts: [
    {id: '1', name: 'Foo Guy', phone: '(619) 555-7380', email: 'foo@guy.com'},
    {id: '2', name: 'Bar Guy', phone: '(858) 555-7380', email: 'bar@guy.com'},
    {id: '3', name: 'Herp Guy', phone: '(415) 555-7380', email: 'herp@guy.com'},
    {id: '4', name: 'Derp Guy', phone: '(650) 555-7380', email: 'derp@guy.com'},
  ],
});
```

This will output something like the following JSX:

```jsx
<RaptorList>
  <RaptorUserItem> ... </RaptorUserItem>
  <RaptorUserItem> ... </RaptorUserItem>
  <RaptorUserItem> ... </RaptorUserItem>
  <RaptorUserItem> ... </RaptorUserItem>
</RaptorList>
```

## TODO

This list is incomplete.

* Event/action dispatching
* Nested layouts.
* Deciding view impl at runtime (injecture).
