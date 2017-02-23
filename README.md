# Ember CLI Framework7

Ember CLI [Framework7](http://www.idangero.us/framework7/) brings the great
mobile development framework to Ember CLI.

Please note, that this version is kind of a [minimal viable product](https://en.wikipedia.org/wiki/Minimum_viable_product)
at the moment but we will keep improving it. If you are interested to
support us, we will be excited to receive your pull requests.

## Installation

`ember install ember-cli-framework7`

## Theme

Framework7 currently comes bundled with both iOS and Material Design themes. To cut down on payload size, this addon allows you
to specify which theme is imported. Simply add the following to your `ember-cli-build.js` file in your `app` options:

```js
  var app = new EmberApp(defaults, {
    'ember-cli-framework7': {
      theme: 'material|ios'
    }
  });
```

Note: `theme` defaults to `ios` if nothing is specified.

## Usage

After you installed Ember CLI Framework7, you can just start using it
within your app. Please refer to the Framework7 [documentation](http://www.idangero.us/framework7/docs/)
to see the markup structure.

In order to be able to use the JavaScript based features of Framework7,
a service is registered within the routes, controllers and components as
`f7`. Within the further documentation we will use the [EmberScript](http://emberscript.com/)
notation for explanations.

```coffeescript
# EmberScript
@f7.alert 'Some alert'
```

```coffeescript
# CoffeeScript
@get('f7').alert 'Some alert'
```

```javascript
// JavaScript
this.get('f7').alert('Some alert');
```

Since the `f7` service extends an instance of the Framework7 class, it
supports all JavaScript methods available for a Framework7 application.
All this methods can be found in the Framework7 documentation.

### Setting Framework7 Options
Framework7 has an [extensive list](https://framework7.io/docs/init-app.html) of options that can be configured during initialization. By default, this addon 
disables `pushState` and `cache` as they may have an adverse affect on how Ember functions. However, you can easily override
these defaults or modify other options by extending the `f7` service. Here's an example:

```js
import Ember from 'ember';
import F7Service from 'ember-cli-framework7/services/f7';

export default F7Service.extend({
  init() {
    // disable f7 router
    const options = this.get('options');
    options.router = false;

    this._super(...arguments);
  }
});
```

## Features

In order to simplify the work with Framework7 within Ember, we added
some component and additional methods on the `f7` service.

### Page container

```emblem
= f7-page-container
  .navbar
    / ...
  .page-content
    / ...
```

### Navbar

Framework7 requires to call `sizeNavbars` after rendering a navbar in
order to ensure the title is centered. Therefore we included a component
creating the required markup for navbars and ensuring the title to be
centered.

```emblem
= f7-navbar
  .left
    a.link.icon-only href="#" click="toggleSidePanel"
      i.icon.icon-bars
```

### Side Panel

For creating the side panel markup and knowing how to toggle it, please refer
to the [side panel documentation of Framework7](http://www.idangero.us/framework7/docs/side-panels.html).

In order to support opening and closing the side panel by swiping, you
need to initialize the listeners within an initializer.

```coffeescript
Framework7Initializer =
  name: 'framework7'
  after: 'framework7-service'
  initialize: (application) ->
    Ember.run.schedule 'afterRender', ->
      container.lookup('service:framework7').initSwipePanels 'left'

`export default Framework7Initializer`
```

### Preloader

The preloader shows a loading mask as an overlay on the application. To
see how it works, please refer to the [preloader documentation of
Framework7](http://www.idangero.us/framework7/docs/preloader.html). In
order to ensure to only show the preloader for long running requests, we
added an delay option to it, so it only shows up if the request was not
finished within the given amount of time.

```coffeescript
# ...
actions:
  save: ->
    @f7.showPreloader delay: 300
    @model.save().then =>
      @f7.hidePreloader()
      @transitionToRoute 'index'
    , =>
      @f7.alert 'error'
```

### Pull-to-refresh

Pull to refresh is supported by Framework7 but there is a bit work to do
to make it run in Ember. In order to understand how pull-to-refresh
works in Framework7, please refer to the [pull-to-refresh
documentation](http://www.idangero.us/framework7/docs/pull-to-refresh.html). To make it as easy as possible to integrate pull-to-refresh into your Ember application, we wrapped all the magic into the f7-page-content component.

```emblem
.pages
  .page.navbar-fixed
    = f7-page-content onPullToRefresh="refresh"
      .list-block
        ul
          /...
```

The refresh action gets a deferred promise passed as the first parameter
which must either be resolved or rejected in order to close the
pull-to-refresh indicator.

```coffeescript
# ...
actions:
  refresh: (deferred) ->
    Ember.run.later this, (->
      deferred.resolve()
    ), 1000
```

### Infinite Scroll

Infinite scroll is also supported by [Framework7](http://www.idangero.us/framework7/docs/infinite-scroll.html) and available through the f7-page-content component.

```emblem
.pages
  .page.navbar-fixed
    = f7-page-content onInfiniteScroll="loadMore"
      .list-block
        ul
          /...

```

The loadMore action gets a deferred promise as the first argument and the component as the second argument, so it's possible to detach the infinite scroll from the page if there is no more need for it.

```coffeescript
# ...
hasMoreData: true
actions:
  loadMore: (deferred, component) ->
    Ember.run.later this, (->
      if @get('hasMoreData')
        deferred.resolve()
      else
        component.detachInfiniteScroll()
    ), 1000
```

### Swipeout

To use Swipeout, you need to include the `ApplicationViewMixin` into the
application view. In order to animate removing the item use the `f7-swipeout`
component.

```javascript
import Ember from 'ember';
import ApplicationViewMixin from 'ember-cli-framework7/mixins/application-view';

export default Ember.View.extend(ApplicationViewMixin, {
});
```

```emblem
.list-block
  ul
    = each
      = f7-swipeout
        .swipeout-content
          a.item-link.item-content href="#" click="'itemClicked' this"
            .item-inner
              .item-title = this
        .swipeout-actions-left
          a href="#"
            | Action 1
          a href="#"
            | Action 2
        .swipeout-actions-right
          a href="#"
            | Action 1
          a.swipeout-delete.swipeout-overswipe" href="#" click="delete this"
            | Delete
```

### Search bar

Use this component.

#### Options

* **searchList** Selector of the search list (default: .list-block-search)
* **searchIn** Selector of the list item element to search in. If this is
  set, Framework7 is filtering the data, if set to `undefined`,
Framework7 will do nothing and you have to take care of filtering the
data. (default: undefined)

#### Actions

* **action** is called when the search term is changed and receives the
  new search term as a parameter.

```emblem
= f7-search-bar action="filter"
  = f7-pull-to-refresh action="refresh"
    .list-block.list-block-search.searchbar-found
      ul
        = each
          .item-inner
            .item-title = this
```

### Sortable

In order to use the sortable feature, add the required markup to the
list item and add the `ApplicationViewMixin` to your application view.
Then enable the sorting by using the `f7` service and the methods
described in the [Framework7 documentation](http://www.idangero.us/framework7/docs/sortable-list.html).

```javascript
import Ember from 'ember';
import ApplicationViewMixin from 'ember-cli-framework7/mixins/application-view';

export default Ember.View.extend(ApplicationViewMixin, {
});
```

## Running the dummy app

The dummy app is a small example of Framework7 within an Ember CLI
application.

* `git clone git@github.com:ember-mobile/ember-cli-framework7.git`
* `npm install`
* `bower install`
* `ember server`
* Visit your app at http://localhost:4200.

For more information on using ember-cli, visit [http://www.ember-cli.com/](http://www.ember-cli.com/).
