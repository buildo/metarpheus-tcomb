import expect from 'expect';
import mt from '../../src/index';
import fs from 'fs';
import path from 'path';

import intermRep from '../fixtures/metarpheus-interm-rep';
const apiOut = fs.readFileSync(path.join(__dirname, '../fixtures/api-out.js'), 'utf8');

describe('api', () => {

  it('should work', () => {
    const { api } = mt({
      intermRep,
      config: {
        apiPrelude: '',
        apiModelPrefix: 'm.',
        overrides: {
          Date: (_, { prefix = '' }) => `${prefix}LabOnlineDate`,
          DateTime: (_, { prefix = '' }) => `${prefix}LabOnlineDateTime`,
          Id: ({ args: [tpe] }, { gen, prefix = '' }) => `${prefix}LabOnlineId/*Id[${gen(tpe)}]*/`
        },
        renameModel: s => s.replace('Camping', 'Package')
      }
    });
    expect(api.trim()).toBe(apiOut.trim());
  });

});
