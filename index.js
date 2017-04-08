/* eslint-disable no-var, object-shorthand, prefer-template */
'use strict';

var Funnel     = require('broccoli-funnel');
var mergeTrees = require('broccoli-merge-trees');
var defaults   = require('lodash.defaults');
var path       = require('path');

module.exports = {
  name: 'ember-cli-framework7',

  /**
   * @public
   * @method included
   */
  included: function(app) {
    this._super.included.apply(this, arguments);

    // https://github.com/ember-cli/ember-cli/issues/3718
    if (typeof app.import !== 'function' && app.app) {
      app = app.app;
    }

    // load Framework7 javascript files
    var base = path.join(this.treePaths.vendor, 'framework7');
    app.import(base + '/js/framework7.js', { prepend: true });

    // load Framework7 stylesheet files
    var config    = this.getConfig();
    var themeBase = path.join(base, 'css', 'framework7.' + config.theme);
    app.import(themeBase + '.colors.css');
    app.import(themeBase + '.css');

    if (config.iconsPath) {
      // load Framework7 icons
      app.import(base + '/css/framework7-icons.css', { destDir: '/fonts' });
      app.import(base + '/fonts/Framework7Icons-Regular.eot', { destDir: '/fonts' });
      app.import(base + '/fonts/Framework7Icons-Regular.ttf', { destDir: '/fonts' });
      app.import(base + '/fonts/Framework7Icons-Regular.woff', { destDir: '/fonts' });
      app.import(base + '/fonts/Framework7Icons-Regular.woff2', { destDir: '/fonts' });
    }
  },

  /**
   * @public
   * @method init
   */
  init: function(app) {
    this._super.init && this._super.init.apply(this, arguments);

    this.options = this.options || {};
    this.options.babel = this.options.babel || {};
    this.options.babel.optional = this.options.babel.optional || [];

    if (this.options.babel.optional.indexOf('es7.decorators') === -1) {
      this.options.babel.optional.push('es7.decorators');
    }
  },

  /**
   * @public
   * @method treeForVendor
   */
  treeForVendor: function(vendorTree) {
    var trees  = [];
    var config = this.getConfig();

    if (vendorTree) {
      trees.push(vendorTree);
    }

    // Add framework7 path to the vendor tree
    trees.push(new Funnel(config.framework7Path, {
      destDir: 'framework7',
      include: [
        'js/framework7.js',
        'js/framework7.js.map',
        'css/framework7.' + config.theme + '.colors.css',
        'css/framework7.' + config.theme + '.css'
      ]
    }));

    if (config.iconsPath) {
      // Add framework7 icon path to the vendor tree
      trees.push(new Funnel(config.iconsPath, {
        destDir: 'framework7',
        include: [
          'css/framework7-icons.css',
          'fonts/Framework7Icons-Regular.eot',
          'fonts/Framework7Icons-Regular.ttf',
          'fonts/Framework7Icons-Regular.woff',
          'fonts/Framework7Icons-Regular.woff2'
        ]
      }));
    }

    return mergeTrees(trees);
  },

  /**
   * @public
   * @method getConfig
   * @return {Object} Addon configuration
   */
  getConfig: function() {
    var projectConfig  = this.project.config(process.env.EMBER_ENV) || {};
    var addonConfig    = projectConfig.framework7 || {};
    var framework7Path = path.dirname(require.resolve('framework7'));

    return defaults(addonConfig, {
      framework7Path: path.join(framework7Path, '..'),
      iconsPath:      path.join(framework7Path, '..', '..', '..', 'framework7-icons'),
      theme:          'ios'
    });
  }
};
