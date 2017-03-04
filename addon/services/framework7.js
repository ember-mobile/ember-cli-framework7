import Ember from 'ember';

const {
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
   * @method initialize
   */
  initialize(options = {}) {
    this._f7 = new Framework7(options);
  }
});
