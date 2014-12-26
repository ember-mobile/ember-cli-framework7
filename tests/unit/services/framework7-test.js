import {
  moduleFor,
  test
} from 'ember-qunit';

moduleFor('service:framework7', 'Framework7Service', {
});

// Here we ensure the existence of methods of the Framework7 service which is
// used by this component.

test('it has property sizeNavbars', function() {
  var service = this.subject();
  equal(typeof service.sizeNavbars, 'function');
});

test('it has property initSearchbar', function() {
  var service = this.subject();
  equal(typeof service.initSearchbar, 'function');
});

test('it has property initPullToRefresh', function() {
  var service = this.subject();
  equal(typeof service.initPullToRefresh, 'function');
});

test('it has property pullToRefreshDone', function() {
  var service = this.subject();
  equal(typeof service.pullToRefreshDone, 'function');
});

test('it has property initSwipeout', function() {
  var service = this.subject();
  equal(typeof service.initSwipeout, 'function');
});

test('it has property swipeoutDelete', function() {
  var service = this.subject();
  equal(typeof service.swipeoutDelete, 'function');
});
