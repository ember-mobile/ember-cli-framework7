import Ember from 'ember';

export default Ember.Component.extend({
  tagName: '',
  searchList: '.list-block-search',
  searchIn: undefined,
  placeholder: 'Search',
  cancelText: 'cancel',
  query: '',

  didInsertElement: function() {
    var searchList = this.$(this.get('searchList'));
    if (searchList.length < 1) {
      throw new Error('There is no search list available within the search bar component.');
    }
    if (searchList.length > 1) {
      throw new Error('There is more then one search list available within the search component.');
    }
    this.get('f7.f7').initSearchbar(this.$());
  },

  onQueryChanged: function() {
    this.sendAction('action', this.get('query'));
  }.observes('query')
});
