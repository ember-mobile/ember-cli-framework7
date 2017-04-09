import sinon from 'sinon';
import { expect } from 'chai';
import { beforeEach, context, describe, it } from 'mocha';
import { setupComponentTest } from 'ember-mocha';
import hbs from 'htmlbars-inline-precompile';

describe('Integration | Component | f7 page content', function() {
  setupComponentTest('f7-page-content', {
    integration: true
  });

  let config;

  beforeEach(function() {
    config = this.container.lookupFactory('config:environment');
    config.framework7.material = false;
  });

  it('renders', function() {
    this.render(hbs`{{f7-page-content}}`);
    expect(this.$()).to.have.length(1);
  });

  it('is not rendering the pull-to-refresh layer', function() {
    this.render(hbs`{{f7-page-content}}`);
    expect(this.$('.pull-to-refresh-layer')).to.have.length(0);
  });

  it('is not rendering the infinite-scroll layer', function() {
    this.render(hbs`{{f7-page-content}}`);
    expect(this.$('.infinite-scroll-preloader')).to.have.length(0);
  });

  context('with pull-to-refresh action', function() {
    let spy;

    beforeEach(function() {
      spy = sinon.spy();
      this.set('onPullToRefresh', spy);
    });

    it('renders the pull-to-refresh layer', function() {
      this.render(hbs`{{f7-page-content onPullToRefresh=onPullToRefresh}}`);
      expect(this.$('.pull-to-refresh-layer')).to.have.length(1);
    });

    it('is not rendering material type loader', function() {
      this.render(hbs`{{f7-page-content onPullToRefresh=onPullToRefresh}}`);
      expect(this.$('.pull-to-refresh-layer .preloader .preloader-inner')).to.have.length(0);
    });

    context('with material specific content enabled', function() {
      beforeEach(function() {
        config.framework7.material = true;
      });

      it('renders the material type loader', function() {
        this.render(hbs`{{f7-page-content onPullToRefresh=onPullToRefresh}}`);
        expect(this.$('.pull-to-refresh-layer .preloader .preloader-inner')).to.have.length(1);
      });
    });

    describe('on pull to request', function() {
      it('calls the given action', function() {
        this.render(hbs`{{f7-page-content onPullToRefresh=onPullToRefresh}}`);
        this.$('> div').trigger('refresh');
        expect(spy).to.have.been.calledOnce;
      });
    });
  });

  context('with infinite-scroll action', function() {
    let spy;

    beforeEach(function() {
      spy = sinon.spy();
      this.set('onInfiniteScroll', spy);
    });

    it('renders the infinite-scroll layer', function() {
      this.render(hbs`{{f7-page-content onInfiniteScroll=onInfiniteScroll}}`);
      expect(this.$('.infinite-scroll-preloader')).to.have.length(1);
    });

    it('is not rendering material type loader', function() {
      this.render(hbs`{{f7-page-content onInfiniteScroll=onInfiniteScroll}}`);
      expect(this.$('.infinite-scroll-preloader .preloader .preloader-inner')).to.have.length(0);
    });

    context('with material specific content enabled', function() {
      beforeEach(function() {
        config.framework7.material = true;
      });

      it('renders the material type loader', function() {
        this.render(hbs`{{f7-page-content onInfiniteScroll=onInfiniteScroll}}`);
        expect(this.$('.infinite-scroll-preloader .preloader .preloader-inner')).to.have.length(1);
      });
    });

    describe('on infinite scroll', function() {
      it('calls the given action', function() {
        this.render(hbs`{{f7-page-content onInfiniteScroll=onInfiniteScroll}}`);
        this.$('> div').trigger('infinite');
        expect(spy).to.have.been.calledOnce;
      });
    });
  });
});
