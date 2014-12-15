import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'li',
  classNames: ['swipeout'],

  didInsertElement: function() {
    var _this = this;
    this.get('f7').initSwipeout(this.$());
  }
});
