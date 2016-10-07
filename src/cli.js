#!/usr/bin/env node

import yargs from 'yargs';
import metarpheusTcomb from './index';
import fs from 'fs';
import path from 'path';
import CliConfig from './CliConfig';

const argv = yargs.argv;
const configFileArg = 'config';
if (!argv[configFileArg]) {
  throw new Error(`missing --${configFileArg}=path/to/config.js[on]`);
}

require('babel-register')({
  only: new RegExp(argv[configFileArg].replace(/\.js$/, '')), // so that config file can be ESwhatever
  extensions: ['.js']
});

const config = CliConfig(require(path.resolve(process.cwd(), argv[configFileArg])));
const intermRep = require(path.resolve(process.cwd(), config.intermRepIn));

const { model, api } = metarpheusTcomb({ intermRep, config });

fs.writeFileSync(config.modelOut, model);
fs.writeFileSync(config.apiOut, api);
