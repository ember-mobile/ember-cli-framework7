import Ember from 'ember';

const {
  assert,
  isPresent,
  run,
  Service
} = Ember;

/**
 * @public
 * @class Framework7
 * @namespace Services
 * @module service
 */
export default Service.extend({
  /**
   * @public
   * @method hidePreloader
   */
  hidePreloader() {
    isPresent(this._preloader) && run.cancel(this._preloader);
    this._preloader = undefined;
    this._f7.hidePreloader();
  },

  /**
   * @public
   * @method initialize
   */
  initialize(options = {}) {
    this._f7 = new Framework7({
      cache:     false,
      pushState: false,
      ...options
    });
  },

  /**
   * @public
   * @method initSwipePanels
   */
  initSwipePanels() {
    assert('swipePanel property must be set', this._f7.params.swipePanel);
    this._f7.initSwipePanels();
  },

  /**
   * @public
   * @method showPreloader
   */
  showPreloader(options = {}) {
    if (isPresent(this._preloader)) {
      return;
    }
    this._preloader = run.later(this._f7.showPreloader, options.delay || 0);
  }
});
