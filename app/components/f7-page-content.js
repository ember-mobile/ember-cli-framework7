import Ember from 'ember';
import PullToRefresh from './f7-page-content/f7-pull-to-refresh'
import InfiniteScroll from './f7-page-content/f7-infinite-scroll'

export default Ember.Component.extend(PullToRefresh, InfiniteScroll, {
  classNames: ['page-content'],
  hasInfiniteScroll: false,
  hasPullToRefresh: false
});
