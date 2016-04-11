// called by mocha
const requireDir = require('require-dir');

require('babel/register')({
  only: [/src/, /tests/, /helpers/, /buildo-react-components/, /react-intl-hoc/],
  extensions: ['.js', '.jsx'],
  stage: 0,
  loose: true
});

requireDir('./tests', {
  recurse: true
});
