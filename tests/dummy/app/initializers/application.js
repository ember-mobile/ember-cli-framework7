import Ember from 'ember';

export function initialize(container, application) {
  Ember.run.schedule('afterRender', function() {
    container.lookup('service:framework7').initSwipePanels('left');
  });
}

export default {
  name: 'application',
  after: 'framework7-service',
  initialize: initialize
};

