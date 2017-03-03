import Ember from 'ember';

export default Ember.Component.extend({
  classNameBindings: [':page', 'navbar:navbar-fixed', 'toolbar:toolbar-fixed'],
  navbar: undefined,
  toolbar: undefined,
  searchBar: undefined,

  /*
   * Initializes a given feature by looking for the given selector within the
   * page container. To overwrite a feature from outside, it could just be set
   * in the handlebars.
   *
   * ### Example
   *
   * ```javascript
   * this.feature('navbar', '.navbar');
   * ```
   */
  feature: function(name, selector) {
    if (this.get(name) === undefined) {
      this.set(name, this.$(selector).length > 0);
    }
  },

  /*
   * Initialized the supported features of the page container.
   */
  didInsertElement: function() {
    this.feature('navbar', '.navbar');
    this.feature('toolbar', '.toolbar');
    this.feature('searchBar', '.searchbar');
  },

  /*
   * Initializes the search bar if this feature is enabled.
   */
  initSearchBar: function() {
    if (this.get('searchBar')) {
      this.get('f7.f7').initSearchbar(this.$());
    }
  }.observes('searchBar')
});
