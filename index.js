require('babel/register')({
  extensions: ['.js'],
  stage: 0,
  loose: true
});

require('./src/index.js');
