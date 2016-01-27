import Ember from 'ember';

var f7 = new Framework7({
  init: false
});

//f7.params.material = false; //ENABLE MATERIAL DESIGN
//f7.theme = null; //THEME NAME, FOR EXAMPLE: 'theme-red'

f7.f7Init = f7.init;
f7.init = function() {
  if(f7.theme){//SET THEME IF SPECIFIED
    Ember.$('body').addClass(f7.theme);
  }
  return this._super();
};

var preloaderTimeout = null;

export default Ember.Object.extend(f7, {
  showPreloader: function(options) {
    if (options == null) {
      options = {};
    }
    if (options.delay) {
      preloaderTimeout = setTimeout(function() {
        preloaderTimeout = null;
        f7.showPreloader();
      }, options.delay);
    } else {
      f7.showPreloader();
    }
  },

  hidePreloader: function() {
    if (preloaderTimeout) {
      clearTimeout(preloaderTimeout);
      preloaderTimeout = null;
    } else {
      f7.hidePreloader();
    }
  },

  initSwipePanels: function(panels) {
    f7.params.swipePanel = panels;
    f7.initSwipePanels()
  }
});
