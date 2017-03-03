import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['navbar'],

  didInsertElement: function() {
    this.$('.center').css('opacity', '0');
    var _this = this;
    setTimeout(function() {
      _this.get('f7.f7').sizeNavbars();
      _this.$('.center').css('opacity', '1');
    }, 0);
  }
});
