export default {
  apiModelPrefix: 'm.',
  intermRepIn: 'test/fixtures/metarpheus-interm-rep.json',
  modelOut: 'test/fixtures/model-out.js',
  apiOut: 'api.js',
  overrides: {
    Date: (_, { prefix = '' }) => `${prefix}LabOnlineDate`,
    DateTime: (_, { prefix = '' }) => `${prefix}LabOnlineDateTime`,
    Id: ({ args: [tpe] }, { gen, prefix = '' }) => `${prefix}LabOnlineId/*Id[${gen(tpe)}]*/`
  },
  modelPrelude: '',
  apiPrelude: '',
  renameModel: s => s.replace('Camping', 'Package')
};
