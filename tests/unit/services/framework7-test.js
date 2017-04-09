import Ember from 'ember';
import sinon from 'sinon';
import { expect } from 'chai';
import { afterEach, beforeEach, describe, it } from 'mocha';
import { setupTest } from 'ember-mocha';

const {
  ComputedProperty,
  RSVP,
  run
} = Ember;

function timeout(ms) {
  return new RSVP.Promise((resolve) => run.later(resolve, ms));
}

describe('Unit | Service | framework7', function() {
  setupTest('service:framework7', { });

  let sandbox, config;

  beforeEach(function() {
    sandbox = sinon.sandbox.create();
    config  = { root: '#ember-testing-container' };
    this.container.registry.register('config:environment', { framework7: config }, { instantiate: false });
  });

  afterEach(function() {
    sandbox.restore();
  });

  it('exists', function() {
    let service = this.subject();
    expect(service).to.be.ok;
  });

  describe('#init', function() {
    it('exists', function() {
      let service = this.subject();
      expect(service).to.respondTo('init');
    });

    it('creates an F7 instance', function() {
      let service = this.subject();
      expect(service._f7).to.be.instanceOf(Framework7);
    });

    it('passes the options when creating F7', function() {
      sandbox.spy(window, 'Framework7');
      config.foo = 'bar';
      this.subject();
      expect(Framework7).to.be.calledWith({
        cache:     false,
        foo:       'bar',
        pushState: false,
        root:      '#ember-testing-container'
      });
    });

    it('can overwrite cache and pushState options', function() {
      sandbox.spy(window, 'Framework7');
      config.cache     = true;
      config.pushState = true;
      this.subject();
      expect(Framework7).to.be.calledWith({
        cache:     true,
        pushState: true,
        root:      '#ember-testing-container'
      });
    });
  });

  describe('hidePreloader', function() {
    let service;

    beforeEach(function() {
      service = this.subject();
    });

    it('exists', function() {
      expect(service).to.respondTo('hidePreloader');
    });

    it('is hiding the preloader using F7', function() {
      sandbox.spy(service._f7, 'hidePreloader');
      service.hidePreloader();
      expect(service._f7.hidePreloader).to.be.called;
    });

    it('is canceling the preloader timeout', function() {
      sandbox.spy(run, 'cancel');
      service._preloader = 'TIMER:FOO';
      service.hidePreloader();
      expect(run.cancel).to.be.calledWith('TIMER:FOO');
    });

    it('is not canceling the timer if none is started', function() {
      sandbox.spy(run, 'cancel');
      service._preloader = undefined;
      service.hidePreloader();
      expect(run.cancel).to.not.be.called;
    });

    it('resets the preloader timer', function() {
      sandbox.spy(run, 'cancel');
      service._preloader = 'TIMER:FOO';
      service.hidePreloader();
      expect(service._preloader).to.be.undefined;
    });
  });

  describe('initSwipePanels', function() {
    it('exists', function() {
      let service = this.subject();
      expect(service).to.respondTo('initSwipePanels');
    });

    it('initializes the swipe panels through F7', function() {
      config.swipePanel = 'left';
      let service = this.subject();
      sandbox.spy(service._f7, 'initSwipePanels');
      service.initSwipePanels();
      expect(service._f7.initSwipePanels).to.be.called;
    });

    it('throws an error if swipePanel is not defined', function() {
      let service = this.subject();
      expect(service.initSwipePanels).to.throw(Error);
    });
  });

  describe('options', function() {
    it('is a property', function() {
      let service = this.subject();
      expect(service.options).to.be.instanceOf(ComputedProperty);
    });

    it('returns an object', function() {
      let service = this.subject();
      expect(service.get('options')).to.be.instanceOf(Object);
    });

    it('contains the config values', function() {
      config.foo = 'bar';
      let service = this.subject();
      expect(service.get('options.foo')).to.eql('bar');
    });

    it('is not containing addon config values', function() {
      config.framework7Path = 'foo';
      config.iconsPath      = 'bar';
      config.theme          = 'baz';
      let service = this.subject();
      expect(service.get('options.framework7Path')).to.be.undefined;
      expect(service.get('options.iconsPath')).to.be.undefined;
      expect(service.get('options.theme')).to.be.undefined;
    });
  });

  describe('showPreloader', function() {
    let service;

    beforeEach(function() {
      service = this.subject();
    });

    it('exists', function() {
      expect(service).to.respondTo('showPreloader');
    });

    it('shows the preloader using F7', async function() {
      sandbox.spy(service._f7, 'showPreloader');
      service.showPreloader();
      await timeout(1);
      expect(service._f7.showPreloader).to.be.called;
    });

    it('is not showing the preloader right away if delay is given', async function() {
      sandbox.spy(service._f7, 'showPreloader');
      service.showPreloader({ delay: 300 });
      await timeout(290);
      expect(service._f7.showPreloader).to.not.be.called;
    });

    it('shows the preloader later if a delay is defined', async function() {
      sandbox.spy(service._f7, 'showPreloader');
      service.showPreloader({ delay: 300 });
      await timeout(310);
      expect(service._f7.showPreloader).to.be.called;
    });

    it('sets a timeout reference', function() {
      service.showPreloader();
      expect(service._preloader).to.not.be.undefined;
    });

    it('is not opening a second preloader if one exists', async function() {
      sandbox.spy(service._f7, 'showPreloader');
      service.showPreloader();
      await timeout(10);
      service.showPreloader();
      await timeout(10);
      expect(service._f7.showPreloader).to.be.calledOnce;
    });
  });

  it('exposes navbar methods', function() {
    let service = this.subject();
    let methods = ['sizeNavbars', 'navbarInitCallback', 'navbarRemoveCallback',
      'initNavbar', 'reinitNavbar', 'initNavbarWithCallback', 'hideNavbar',
      'showNavbar', 'showNavbar', 'showToolbar'];
    methods.forEach((name) => {
      expect(service).to.respondTo(name);
    });
  });
});
