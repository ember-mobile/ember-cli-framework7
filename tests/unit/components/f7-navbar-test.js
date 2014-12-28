import {
  moduleForComponent,
  test
} from 'ember-qunit';

moduleForComponent('f7-navbar', 'F7NavbarComponent', {
});

test('navbar text is centered', function() {
  //expect(2);

  //var windowCenter = Math.round($(window).width() / 2);

  //visit('/').then(function () {
  //  debugger;
  //});

  // creates the component instance
  //var component = this.subject();
  //equal(component._state, 'preRender');

  // appends the component to the page
  //this.append();
  //equal(component._state, 'inDOM');
  //
  var component = this.subject();
  this.render();
});
