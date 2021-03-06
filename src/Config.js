import t from 'tcomb';

export default t.interface({
  modelPrelude: t.maybe(t.String),
  apiPrelude: t.maybe(t.String),
  apiModelPrefix: t.maybe(t.String), // should match the import name of model.js from api.js
  overrides: t.maybe(t.dict(t.String, t.Function)),
  renameModel: t.maybe(t.Function)
}, 'Config');