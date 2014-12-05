import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['page-content', 'pull-to-refresh-content'],

  didInsertElement: function() {
    var _this = this;
    this.get('f7').initPullToRefresh(this.$());
    this.$().on('refresh', function() {
      var deferred = Ember.RSVP.defer();
      deferred.promise.finally(function() {
        _this.get('f7').pullToRefreshDone();
      });
      _this.sendAction('action', deferred);
    });
  }
});
