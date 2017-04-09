import Ember from 'ember';
import layout from '../templates/components/f7-page-content';

const {
  Component,
  computed,
  inject,
  RSVP
} = Ember;

/**
 * @public
 * @class F7PageContent
 * @namespace Component
 * @module components
 */
export default Component.extend({
  /**
   * @private
   * @property classNameBindings
   * @type {Array}
   */
  classNameBindings: [
    '_hasInfiniteScroll:infinite-scroll',
    '_hasPullToRefresh:pull-to-refresh-content'
  ],

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
  layout,

  /**
   * If this property has a function assigned (i.e. a closure action),
   * infinite-scroll is activated for the page-content.
   *
   * @public
   * @property onInfiniteScroll
   * @type {Function}
   * @default null
   */
  onInfiniteScroll: null,

  /**
   * If this property has a function assigned (i.e. a closure action),
   * pull-to-refresh is activated for the page-content.
   *
   * @public
   * @property onPullToRefresh
   * @type {Function}
   * @default null
   */
  onPullToRefresh: null,

  /**
   * @private
   * @property _hasInfiniteScroll
   * @type {Boolean}
   */
  _hasInfiniteScroll: computed('onInfiniteScroll', function() {
    return typeof this.get('onInfiniteScroll') === 'function';
  }),

  /**
   * @private
   * @property _hasPullToRefresh
   * @type {Boolean}
   */
  _hasPullToRefresh: computed('onPullToRefresh', function() {
    return typeof this.get('onPullToRefresh') === 'function';
  }),

  /**
   * @private
   * @method didInsertElement
   */
  didInsertElement(...args) {
    this._setupInfiniteScroll();
    this._setupPullToRefresh();
    return this._super(...args);
  },

  /**
   * @private
   * @method setupInfiniteScroll
   */
  _setupInfiniteScroll() {
    if (!this.get('_hasInfiniteScroll')) {
      return;
    }
    this.get('framework7').attachInfiniteScroll(this.$());
    let action = this.get('onInfiniteScroll');
    this.$().on('infinite', () => {
      if (this.get('_infiniteScrollLoading')) {
        return;
      }
      this.$().find('.infinite-scroll-preloader').show();
      this.set('_infiniteScrollLoading', true);
      let promise = action();
      if (!promise || !promise.finally) {
        promise = RSVP.resolve();
      }
      promise.finally(() => {
        this.set('_infiniteScrollLoading', false);
        this.$().find('.infinite-scroll-preloader').hide();
      });
    });
  },

  /**
   * @private
   * @method setupPullToRefresh
   */
  _setupPullToRefresh() {
    if (!this.get('_hasPullToRefresh')) {
      return;
    }
    this.get('framework7').initPullToRefresh(this.$());
    let action = this.get('onPullToRefresh');
    this.$().on('refresh', () => {
      let promise = action();
      if (!promise || !promise.finally) {
        promise = RSVP.resolve();
      }
      promise.finally(() => {
        this.get('framework7').pullToRefreshDone();
      });
    });
  }
});
