import Ember from 'ember';

var f7 = new Framework7({
  init: false
});

var preloaderTimeout = null;

export default Ember.Object.extend(f7, {
  showPreloader: function(options = {}) {
    if (options.wait) {
    } else {
      f7.showPreloader();
    }
  },

  hidePreloader: function() {
  }
});

Framework7Service = Ember.Object.extend(f7, {
  showPreloader: function() {
    return preloaderTimeout = setTimeout(((function(_this) {
      return function() {
        preloaderTimeout = null;
        return f7.showPreloader();
      };
    })(this)), 300);
  },
  hidePreloader: function() {
    if (preloaderTimeout) {
      clearTimeout(preloaderTimeout);
      return preloaderTimeout = null;
    } else {
      return f7.hidePreloader();
    }
  }
});

export default Framework7Service;

