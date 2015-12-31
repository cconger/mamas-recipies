var Funnel = require('broccoli-funnel');
var watchify = require('broccoli-watchify');
var MergeTrees = require('broccoli-merge-trees');
var less = require('broccoli-less');

var appJS = watchify('src', {
  browserify: {
    entries: ['./app.js'],
    debug: true
  },
  outputFile: 'application.js',
  cache: true,
  init: function(b) {
    b.transform('babelify', {presets: ['es2015', 'react']});
  }
});

var staticAssets = 'src/static';

var index = new Funnel('src', {
  files: [
    'index.html'
  ]
});

var styles = less('src/styles', {
  filename: 'main.less',
  compress: true
});

module.exports = new MergeTrees([
  appJS,
  staticAssets,
  index,
  styles
]);
