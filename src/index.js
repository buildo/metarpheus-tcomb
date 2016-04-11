import yargs from 'yargs';
import metarpheusTcomb from './metarpheusTcomb';
import IntermRep from './IntermRep';
import Config from './Config';
import fs from 'fs';

const argv = yargs.argv;
const configFileArg = 'config';
if (!argv[configFileArg]) {
  throw new Error(`missing --${configFileArg}=path/to/config.js[on]`);
}

const {
  intermRepIn,
  modelPrelude = `// DO NOT EDIT MANUALLY - metarpheus-generated

`,
  apiPrelude = `// DO NOT EDIT MANUALLY - metarpheus-generated

`,
  apiModelPrefix = '',
  modelOut = 'model.js',
  apiOut = '',
  overrides = {}
} = Config(require(argv[configFileArg]));

const intermRep = IntermRep(require(intermRepIn));

const { model, api } = metarpheusTcomb({ intermRep, overrides, modelPrelude, apiPrelude, apiModelPrefix });

fs.writeFileSync(modelOut, model);
if (apiOut) {
  fs.writeFileSync(apiOut, api);
}
