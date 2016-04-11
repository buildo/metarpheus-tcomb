const modelPrelude = `// DO NOT EDIT MANUALLY - metarpheus-generated

import t from 'tcomb';
export const Period = t.String;
export const LabOnlineId = t.String;
export { LabOnlineDate, LabOnlineDateTime } from '../LabOnlineDate';
import { LabOnlineDate, LabOnlineDateTime } from '../LabOnlineDate';
export { LabOnlineDuration } from '../LabOnlineDuration';
import { LabOnlineDuration } from '../LabOnlineDuration';
`;


export default {
  modelPrelude,
  apiPrelude: `${modelPrelude}
import * as m from './model';
`,
  intermRepIn: 'test/fixtures/metarpheus-interm-rep.json',
  modelOut: 'model.js',
  apiOut: 'api.js',
  overrides: {
    Date: (_, { prefix = '' }) => `${prefix}LabOnlineDate`,
    DateTime: (_, { prefix = '' }) => `${prefix}LabOnlineDateTime`,
    Id: ({ args: [tpe] }, { gen, prefix = '' }) => `${prefix}LabOnlineId/*Id[${gen(tpe)}]*/`
  }
};