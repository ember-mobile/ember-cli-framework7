import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'li',
  classNames: ['swipeout'],

  didInsertElement: function() {
    var _this = this;
    this.get('f7').initSwipeout(this.$());
  },

  willDestroyElement: function() {
    var _this = this;
    var parent = this.$().parent();
    var index = parent.children().index(this.$());
    var clone = this.$().clone();
    clone.find('script').remove();
    Ember.run.scheduleOnce('afterRender', function() {
      var elem = parent.children()[index];
      if(elem) {
        $(parent.children()[index]).before(clone);
      } else {
        parent.append(clone);
      }
      _this.get('f7').swipeoutDelete(clone);
    });
  }
});
