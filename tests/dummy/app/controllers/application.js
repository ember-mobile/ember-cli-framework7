import Ember from 'ember';

export default Ember.ArrayController.extend({
  sortable: false,

  setSortable: function() {
    if (this.get('sortable')) {
      this.get('f7').sortableOpen('.sortable');
    } else {
      this.get('f7').sortableClose('.sortable');
    }
  }.observes('sortable'),

  actions: {
    itemClicked: function(item) {
      this.get('f7').alert('Item "'+item+'" clicked');
    },

    panelLeft: function() {
      this.get('f7').openPanel('left');
    },

    refresh: function(deferred) {
      Ember.run.later(this, function() {
        deferred.resolve();
      }, 1000);
    },

    delete: function(item) {
      this.removeObject(item);
    },

    toggleSortable: function() {
      this.set('sortable', !this.get('sortable'));
    }
  }
});
