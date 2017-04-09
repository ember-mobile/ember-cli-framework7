import Ember from 'ember';

const {
  assert,
  getOwner,
  isPresent,
  run,
  Service
} = Ember;

/**
 * @private
 * @property REJECT_KEYS
 * @type {Array}
 */
const REJECT_KEYS = ['framework7Path', 'iconsPath', 'theme'];

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
  init(...args) {
    this._f7 = new Framework7({
      cache:     false,
      pushState: false,
      ...this._options()
    });

    // Expose all F7 methods throuh the service
    this._mimic(this._f7);

    return this._super(...args);
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
  },

  /**
   * @private
   * @method _options
   * @return {Object}
   */
  _options() {
    let env     = getOwner(this).lookup('config:environment');
    let options = (env || {}).framework7 || {};
    let result  = { ...options }; // Clone the object
    REJECT_KEYS.forEach((key) => delete result[key]);
    return result;
  },

  /**
   * @private
   * @method _mimic
   */
  _mimic(object) {
    for (let key in object) {
      if (object.hasOwnProperty(key) && this[key] === undefined && typeof object[key] === 'function') {
        this[key] = object[key].bind(object);
      }
    }
  }
});
