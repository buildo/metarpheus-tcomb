import t from 'tcomb';

export default t.struct({
  intermRepIn: t.String,
  modelPrelude: t.maybe(t.String),
  apiPrelude: t.maybe(t.String),
  modelOut: t.String,
  apiOut: t.maybe(t.String),
  overrides: t.maybe(t.dict(t.String, t.Function))
}, 'Config');