Package.describe({
  name: 'wangff:seelejs',
  version: '0.1.5',
  // Brief, one-line summary of the package.
  summary: 'Seele JavaScript API, middleware for communicating with the Seele nodes via RPC',
  // URL to the Git repository containing the source code for this package.
  git: 'https://github.com/seeleteam/seelejs.git',
  // By default, Meteor will default to using README.md for documentation.
  // To avoid submitting documentation, set this field to null.
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('1.8');
  api.export('SeeleWebProvider', ['client', 'server']);
  api.addFiles('browserify/seele_browserify.js', ['client', 'server']);
  api.addFiles('package-init.js', ['client', 'server']);
  
  // api.use('3stack:bignumber@2.0.0', 'client');
  // api.use('ecmascript');
  // api.mainModule('src/seele.js');
});

// Package.onTest(function(api) {
//   api.use('ecmascript');
//   api.use('tinytest');
//   api.use('wangff:seelejs');
//   api.mainModule('seelejs-tests.js');
// });
