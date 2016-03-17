var path = require('path'); // eslint-disable-line no-var

require('babel-register')({
  only: ['config'],
  presets: [path.join(__dirname, 'config/babel/node/dev')],
  retainLines: true,
});
require('babel-polyfill');
require('./config/gulp');
