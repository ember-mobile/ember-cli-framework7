export function initialize(container, application) {
  application.inject('application', 'f7', 'service:framework7')
  application.inject('route', 'f7', 'service:framework7')
  application.inject('controller', 'f7', 'service:framework7')
  application.inject('component', 'f7', 'service:framework7')
}

export default {
  name: 'framework7-service',
  initialize: initialize
};
