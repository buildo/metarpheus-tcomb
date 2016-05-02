import expect from 'expect';
import genType from '../../src/genType';
import genCaseEnum from '../../src/genCaseEnum';
import genCaseClass from '../../src/genCaseClass';
import metarpheusTcomb from '../../src/metarpheusTcomb';
import IntermRep from '../../src/IntermRep';
import fs from 'fs';
import path from 'path';

import _intermRep from '../fixtures/metarpheus-interm-rep';
const modelOut = fs.readFileSync(path.join(__dirname, '../fixtures/model-out.js'), 'utf8');

describe('genType', () => {

  it('should work 1', () => {
    expect(genType()()({
      name: 'List',
      args: [{ name: 'ICQAssayReference' }]
    })).toBe(
      't.list(ICQAssayReference)'
    );
  });

  it('should work 2', () => {
    expect(genType()()({
      name: 'Date'
    })).toBe(
      't.String'
    );
  });

  it('should work with overrides', () => {
    expect(genType({
      overrides: {
        Date: () => 'HelloDate'
      }
    })()({
      name: 'Date'
    })).toBe(
      'HelloDate'
    );
  });

  it('should work with prefix', () => {
    expect(genType()(
      'myModel.'
    )({
      name: 'Custom'
    })).toBe(
      'myModel.Custom'
    );
  });

  it('should work recursively with prefix', () => {
    expect(genType()(
      'myModel.'
    )({
      name: 'List',
      args: [{ name: 'Custom' }]
    })).toBe(
      't.list(myModel.Custom)'
    );
  });

  it('should work with prefix and overrides', () => {
    expect(genType({
      overrides: {
        Date: (_, { prefix = '' }) => `${prefix}HelloDate`
      }
    })(
      'myModel.'
    )({
      name: 'Date'
    })).toBe(
      'myModel.HelloDate'
    );
  });

});

describe('genCaseEnum', () => {

  it('should work', () => {
    expect(genCaseEnum()({
      name: 'AccurateWeather',
      values: [{ name: 'Sunny' }, { name: 'OK' }, { name: 'Shitty', desc: 'real shit' }]
    })().replace(/\s/g, '')).toBe(`AccurateWeather.define(t.enums.of([
      'Sunny',
      'OK',
      // real shit
      'Shitty'
    ]));`.replace(/\s/g, ''));
  });

  it('should work renaming', () => {
    expect(genCaseEnum({ renameModel: s => s.replace('Accurate', 'True') })({
      name: 'AccurateWeather',
      values: [{ name: 'Sunny' }, { name: 'OK' }, { name: 'Shitty', desc: 'real shit' }]
    })().replace(/\s/g, '')).toBe(`TrueWeather.define(t.enums.of([
      'Sunny',
      'OK',
      // real shit
      'Shitty'
    ]));`.replace(/\s/g, ''));
  });

});

describe('genCaseClass', () => {

  it('should work', () => {
    expect(genCaseClass({ genType: genType() })({
      name: 'Camping',
      members: [{
        name: 'name',
        tpe: {
          name: 'String'
        },
        desc: 'camping name'
      }, {
        name: 'size',
        tpe: {
          name: 'Int'
        },
        desc: 'number of tents'
      }]
    })().replace(/\s/g, '')).toBe(`Camping.define(t.struct({
      // camping name
      name: t.String,
      // number of tents
      size: t.Number
    }));`.replace(/\s/g, ''));
  });

  it('should work renaming', () => {
    expect(genCaseClass({ genType: genType(), renameModel: () => 'Package' })({
      name: 'Camping',
      members: [{
        name: 'name',
        tpe: {
          name: 'String'
        },
        desc: 'camping name'
      }, {
        name: 'size',
        tpe: {
          name: 'Int'
        },
        desc: 'number of tents'
      }]
    })().replace(/\s/g, '')).toBe(`Package.define(t.struct({
      // camping name
      name: t.String,
      // number of tents
      size: t.Number
    }));`.replace(/\s/g, ''));
  });

});

describe('the whole thing', () => {

  it('should work', () => {
    const intermRep = IntermRep(_intermRep);
    const { model } = metarpheusTcomb({
      intermRep,
      overrides: {
        Date: (_, { prefix = '' }) => `${prefix}LabOnlineDate`,
        DateTime: (_, { prefix = '' }) => `${prefix}LabOnlineDateTime`,
        Id: ({ args: [tpe] }, { gen, prefix = '' }) => `${prefix}LabOnlineId/*Id[${gen(tpe)}]*/`
      },
      modelPrelude: '',
      apiPrelude: '',
      renameModel: s => s.replace('Camping', 'Package')
    });
    expect(model.trim()).toBe(modelOut.trim());
  });

});
