import Ember from 'ember';

export default Ember.Mixin.create({
  setupPullToRefresh: function() {
    var _this = this,
    action = this.get('onPullToRefresh');
    if (action) {
      this.$().addClass('pull-to-refresh-content');
      this.set('hasPullToRefresh', true);
      this.get('f7.f7').initPullToRefresh(this.$());
      this.$().on('refresh', function() {
        var deferred = Ember.RSVP.defer();
        deferred.promise.finally(function() {
          _this.get('f7.f7').pullToRefreshDone();
        });
        _this.sendAction('onPullToRefresh', deferred);
      });
    }
  }.on('didInsertElement')
});
