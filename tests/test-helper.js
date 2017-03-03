import chai from 'chai';
import sinonChai from 'npm:sinon-chai';
import resolver from './helpers/resolver';
import { setResolver } from 'ember-mocha';

setResolver(resolver);

chai.use(sinonChai);
