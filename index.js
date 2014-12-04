/* jshint node: true */
'use strict';

module.exports = {
  name: 'ember-cli-framework7',

  included: function(app) {
    this.app = app;
    this._super.included(app);

    app.import('vendor/css/ember-cli-framework7.css');

    var bowerDirectory = app.bowerDirectory;
    app.import(bowerDirectory + '/framework7/dist/css/framework7.css');
    app.import(bowerDirectory + '/framework7/dist/css/framework7.themes.css');
    app.import(bowerDirectory + '/framework7/dist/js/framework7.js');
  }
};
