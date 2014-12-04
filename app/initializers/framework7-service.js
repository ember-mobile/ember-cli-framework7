export function initialize(container, application) {
  application.inject('route', 'framework7Service', 'service:framework7');
}

export default {
  name: 'framework7-service',
  initialize: initialize
};
