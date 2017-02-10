/* jshint node: true */
'use strict';

module.exports = {
  name: 'ember-cli-framework7',

  options: {
    nodeAssets: {
      'framework7': function() {
          return {
            srcDir: 'dist',
            import: [
              'js/framework7.js',
              ...this.themeFiles
            ]
          };
      }
    }
  },

  included: function(app) {

    // import fix for Ember view height
    app.import('vendor/css/ember-cli-framework7.css');

    // default to iOS theme
    let theme = 'ios';

    // if theme was configured in f7 options, use it
    if (app.options && app.options['ember-cli-framework7'] && app.options['ember-cli-framework7'].theme) {
      theme = app.options['ember-cli-framework7'].theme;
    }

    // set theme files to import
    this.themeFiles = [`css/framework7.${theme}.css`, `css/framework7.${theme}.colors.css`];

    this._super.included.apply(this, arguments);
  }
};
