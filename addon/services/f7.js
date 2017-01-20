import Ember from 'ember';

const { Service, computed } = Ember;

export default Service.extend({
  f7: null,
  options: computed(function() {
    return {
      init: this._f7Init,
      cache: false,
      pushState: false
    };
  }),

  preloaderTimeout: null,

  init() {
    this._super(...arguments);
    this.set('f7', new Framework7(this.get('options')));
  },

  _f7Init() {
    const f7 = this.get('f7');
    if(f7.theme){
      Ember.$('body').addClass(f7.theme);
    }
  },

  showPreloader(options) {
    const f7 = this.get('f7');
    let preloaderTimeout = this.get('preloaderTimeout');

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

  hidePreloader() {
    const f7 = this.get('f7');
    let preloaderTimeout = this.get('preloaderTimeout');

    if (preloaderTimeout) {
      clearTimeout(preloaderTimeout);
      preloaderTimeout = null;
    } else {
      f7.hidePreloader();
    }
  },

  initSwipePanels(panels) {
    const f7 = this.get('f7');

    f7.params.swipePanel = panels;
    f7.initSwipePanels();
  }
});
