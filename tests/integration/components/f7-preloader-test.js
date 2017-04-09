import { expect } from 'chai';
import { describe, it } from 'mocha';
import { setupComponentTest } from 'ember-mocha';
import hbs from 'htmlbars-inline-precompile';

describe('Integration | Component | f7 preloader', function() {
  setupComponentTest('f7-preloader', {
    integration: true
  });

  let config;

  beforeEach(function() {
    config = this.container.lookupFactory('config:environment');
    config.framework7.material = false;
  });

  it('renders', function() {
    this.render(hbs`{{f7-preloader}}`);
    expect(this.$()).to.have.length(1);
  });

  it('is not rendering the material type loader', function() {
    this.render(hbs`{{f7-preloader}}`);
    expect(this.$('.preloader-inner')).to.have.length(0);
  });

  context('with material specific content enabled', function() {
    beforeEach(function() {
      config.framework7.material = true;
    });

    it('renders the material type loader', function() {
      this.render(hbs`{{f7-preloader}}`);
      expect(this.$('.preloader-inner')).to.have.length(1);
    });
  });
});
