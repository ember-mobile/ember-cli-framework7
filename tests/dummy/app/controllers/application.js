import Ember from 'ember';

export default Ember.ArrayController.extend({
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
    }
  }
});
