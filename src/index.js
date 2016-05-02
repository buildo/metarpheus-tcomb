#!/usr/bin/env node

import yargs from 'yargs';
import metarpheusTcomb from './metarpheusTcomb';
import IntermRep from './IntermRep';
import Config from './Config';
import fs from 'fs';
import path from 'path';

const argv = yargs.argv;
const configFileArg = 'config';
if (!argv[configFileArg]) {
  throw new Error(`missing --${configFileArg}=path/to/config.js[on]`);
}

require('babel/register')({
  only: new RegExp(argv[configFileArg].replace(/\.js$/, '')), // so that config file can be ESwhatever
  extensions: ['.js'],
  stage: 0,
  loose: true
});

const {
  intermRepIn,
  modelPrelude = `// DO NOT EDIT MANUALLY - metarpheus-generated

`,
  apiPrelude = `// DO NOT EDIT MANUALLY - metarpheus-generated

`,
  apiModelPrefix = '',
  modelOut = 'model.js',
  apiOut = '',
  overrides = {},
  renameModel = v => v
} = Config(require(path.resolve(process.cwd(), argv[configFileArg])));

const intermRep = IntermRep(require(path.resolve(process.cwd(), intermRepIn)));

const { model, api } = metarpheusTcomb({ intermRep, overrides, modelPrelude, apiPrelude, apiModelPrefix, renameModel });

fs.writeFileSync(modelOut, model);
if (apiOut) {
  fs.writeFileSync(apiOut, api);
}
