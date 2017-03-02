import Ember from 'ember';

export default Ember.Mixin.create({
  setupInfiniteScroll: function() {
    var _this = this,
    action = this.get('onInfiniteScroll');
    if (action) {
      this.$().addClass('infinite-scroll');
      this.set('hasInfiniteScroll', true);
      this.get('f7.f7').attachInfiniteScroll(this.$());
      this.$().on('infinite', function() {
        if (_this.get('loading')) return;
        _this.$().find('.infinite-scroll-preloader').show();
        _this.set('loading', true);

        var deferred = Ember.RSVP.defer();
        deferred.promise.finally(function() {
          _this.set('loading', false);
          _this.$().find('.infinite-scroll-preloader').hide();
        });
        _this.sendAction('onInfiniteScroll', deferred, _this);
      });
    }
  }.on('didInsertElement'),

  detachInfiniteScroll: function() {
    this.get('f7.f7').detachInfiniteScroll(this.$());
    this.$().find('.infinite-scroll-preloader').hide();
  }
});
