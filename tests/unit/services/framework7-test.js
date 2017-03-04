import Ember from 'ember';
import sinon from 'sinon';
import { expect } from 'chai';
import { afterEach, beforeEach, describe, it } from 'mocha';
import { setupTest } from 'ember-mocha';

const {
  RSVP,
  run
} = Ember;

function timeout(ms) {
  return new RSVP.Promise((resolve) => run.later(resolve, ms));
}

describe('Unit | Service | framework7', function() {
  setupTest('service:framework7', { });

  let sandbox, service;

  beforeEach(function() {
    sandbox = sinon.sandbox.create();
    service = this.subject();
  });

  afterEach(function() {
    sandbox.restore();
  });

  it('exists', function() {
    expect(service).to.be.ok;
  });

  describe('#initialize', function() {
    it('exists', function() {
      expect(service).to.respondTo('initialize');
    });

    it('creates an F7 instance', function() {
      service.initialize();
      expect(service._f7).to.be.instanceOf(Framework7);
    });

    it('passes the options when creating F7', function() {
      sandbox.spy(window, 'Framework7');
      service.initialize({ foo: 'bar' });
      expect(Framework7).to.be.calledWith({
        cache:     false,
        foo:       'bar',
        pushState: false
      });
    });

    it('can overwrite cache and pushState options', function() {
      sandbox.spy(window, 'Framework7');
      service.initialize({
        cache:     true,
        pushState: true
      });
      expect(Framework7).to.be.calledWith({
        cache:     true,
        pushState: true
      });
    });
  });

  describe('hidePreloader', function() {
    beforeEach(function() {
      service.initialize();
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
      expect(service).to.respondTo('initSwipePanels');
    });

    it('initializes the swipe panels through F7', function() {
      service.initialize({ swipePanel: 'left' });
      sandbox.spy(service._f7, 'initSwipePanels');
      service.initSwipePanels();
      expect(service._f7.initSwipePanels).to.be.called;
    });

    it('throws an error if swipePanel is not defined', function() {
      service.initialize();
      expect(service.initSwipePanels).to.throw(Error);
    });
  });

  describe('showPreloader', function() {
    beforeEach(function() {
      service.initialize();
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
});
