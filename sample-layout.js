// Example view model hierarchy.
// This is the equivalent of a Layout.js file in BandPage days.
// This is the "layout language".

const SAMPLE_HIERARCHY = {
  // Page/route/container name.
  Home: {
    // View model key.
    contacts: {
      // View to use for this view model key.
      $view: 'RaptorList',
      // This is a list key, so we need to also specify child views.
      $children: 'RaptorUserItem',
    },
  },
  Detail: {
    $view: 'RaptorUserDetail'
  },
};

// Example view model used to hydrade the above hierarchy (Home page).

const SAMPLE_VIEW_MODEL = {
  contacts: [
    {id: '1', name: 'Foo Guy', phone: '(619) 818-7380', email: 'foo@guy.com'},
    {id: '2', name: 'Bar Guy', phone: '(858) 818-7380', email: 'bar@guy.com'},
    {id: '3', name: 'Herp Guy', phone: '(415) 818-7380', email: 'herp@guy.com'},
    {id: '4', name: 'Derp Guy', phone: '(650) 818-7380', email: 'derp@guy.com'},
  ],
};

// Example layout config that would be created from the above view model.
// Raptor.render('Home', SAMPLE_VIEW_MODEL);
// Raptor.render() call would not produce the below. That's like, an intermedate
// step.

// ...I don't think this intermediate step is needed at all, actually.
const SAMPLE_LAYOUT = {
  contacts: {
    $view: 'RaptorList',
    $children: [
      {
        $view: 'RaptorUserItem',
        $props: {id: '1', name: 'Foo Guy', /* ... */},
      },
      // ...
    ],
  },
};
