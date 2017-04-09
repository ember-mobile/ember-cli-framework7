import Ember from 'ember';
import layout from '../templates/components/f7-preloader';

const {
  Component,
  inject
} = Ember;

/**
 * @public
 * @class F7Preloader
 * @namespace Component
 * @module components
 */
export default Component.extend({
  /**
   * @private
   * @property classNames
   * @type {Array}
   * @default ['preloader']
   */
  classNames: ['preloader'],

  /**
   * @private
   * @property framework7
   * @type {Service.Framework7}
   * @default {Ember.InjectedProperty}
   */
  framework7: inject.service(),

  /**
   * @private
   * @property layout
   */
  layout
});
