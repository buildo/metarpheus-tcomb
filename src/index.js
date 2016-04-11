import yargs from 'yargs';
import metarpheusTcomb from './metarpheusTcomb';
import IntermRep from './IntermRep';

const argv = yargs.argv;
const intermRepIn = 'interm-rep-in';
if (!argv[intermRepIn]) {
  throw new Error(`missing ${intermRepIn}=path/to/metarpheus-interm-rep.json`);
}

const intermRepSource = require(argv[intermRepIn]);
// TODO(gio): should be configurable
import modelPrelude from './modelPrelude';
// TODO(gio): should be configurable
import apiPrelude from './apiPrelude';
// TODO(gio): should be configurable
const overrides = {
  Date: (_, { prefix = '' }) => `${prefix}LabOnlineDate`,
  DateTime: (_, { prefix = '' }) => `${prefix}LabOnlineDateTime`,
  Id: ({ args: [tpe] }, { gen, prefix = '' }) => `${prefix}LabOnlineId/*Id[${gen(tpe)}]*/`
};

const intermRep = IntermRep(intermRepSource);

const { model, api } = metarpheusTcomb({ intermRep, overrides, modelPrelude, apiPrelude });

console.log(model);