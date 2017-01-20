/* jshint node: true */
'use strict';

module.exports = {
  name: 'ember-cli-framework7',

  included: function(app) {
    this.app = app;
    this._super.included(app);

    // Import fix for Ember view height
    app.import('vendor/css/ember-cli-framework7.css');

    const bowerDirectory = app.bowerDirectory;
    const { options } = app;

    // Import theme based on options, otherwise default to iOS
    if (options['ember-cli-framework7'] && options['ember-cli-framework7'].theme === 'material') {
      app.import(bowerDirectory + '/framework7/dist/css/framework7.material.css');
      app.import(bowerDirectory + '/framework7/dist/css/framework7.material.colors.css');
    } else {
      app.import(bowerDirectory + '/framework7/dist/css/framework7.ios.css');
      app.import(bowerDirectory + '/framework7/dist/css/framework7.ios.colors.css');
    }

    // Import Framework 7 core
    app.import(bowerDirectory + '/framework7/dist/js/framework7.min.js');
    app.import(bowerDirectory + '/framework7/dist/js/framework7.min.js.map', {
      destDir: 'assets'
    });
  }
};
