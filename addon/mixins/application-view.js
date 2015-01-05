import Ember from 'ember';

export default Ember.Mixin.create({
  didInsertElement: function() {
    // initialize swipeout
    if (this.get('f7InitSwipeout') !== false) {
      this.get('f7').initSwipeout();
    }

    // initialize sortable
    if (this.get('f7InitSortable') !== false) {
      this.get('f7').initSortable();
    }
  }
});
