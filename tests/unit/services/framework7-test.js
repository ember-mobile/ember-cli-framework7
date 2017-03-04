import sinon from 'sinon';
import { expect } from 'chai';
import { afterEach, beforeEach, describe, it } from 'mocha';
import { setupTest } from 'ember-mocha';

describe('Unit | Service | framework7', function() {
  setupTest('service:framework7', { });

  let sandbox, subject;

  beforeEach(function() {
    sandbox = sinon.sandbox.create();
    subject = this.subject();
  });

  afterEach(function() {
    sandbox.restore();
  });

  it('exists', function() {
    expect(subject).to.be.ok;
  });

  describe('#initialize', function() {
    it('exists', function() {
      expect(subject).to.respondTo('initialize');
    });

    it('creates an F7 instance', function() {
      subject.initialize();
      expect(subject._f7).to.be.instanceOf(Framework7);
    });

    it('passes the options when creating F7', function() {
      sandbox.spy(window, 'Framework7');
      subject.initialize('foo');
      expect(Framework7).to.be.calledWith('foo');
    });
  });
});
