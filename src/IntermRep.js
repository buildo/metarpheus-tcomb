import t from 'tcomb';

export const Tpe = t.declare('Tpe');

Tpe.define(t.interface({
  name: t.String,
  args: t.maybe(t.list(Tpe))
}));

export const RouteParam = t.interface({
  name: t.maybe(t.String),
  tpe: Tpe,
  required: t.Boolean,
  desc: t.maybe(t.String)
}, 'RouteParam');

export const NamedRouteParam = t.refinement(RouteParam, v => t.String.is(v.name), 'NamedRouteParam');

export const StringSegment = t.interface({ str: t.String }, 'StringSegment');
export const ParamSegment = t.interface({ routeParam: RouteParam }, 'ParamSegment');
export const RouteSegment = t.union([StringSegment, ParamSegment], 'RouteSegment');
RouteSegment.dispatch = v => v.routeParam ? ParamSegment : StringSegment;

export const Route = t.interface({
  method: t.String,
  route: t.list(RouteSegment),
  params: t.list(NamedRouteParam),
  authenticated: t.Boolean,
  returns: Tpe,
  ctrl: t.list(t.String),
  desc: t.maybe(t.String),
  name: t.list(t.String)
}, 'Route');

export const Member = t.interface({
  name: t.String,
  tpe: Tpe,
  desc: t.maybe(t.String)
}, 'Member');

export const CaseClass = t.interface({
  name: t.String,
  members: t.list(Member),
  desc: t.maybe(t.String)
}, 'CaseClass');

export const Value = t.interface({
  name: t.String,
  desc: t.maybe(t.String)
}, 'Value');

export const CaseEnum = t.interface({
  name: t.String,
  values: t.list(Value),
  desc: t.maybe(t.String)
}, 'CaseEnum');

export const Model = t.union([CaseClass, CaseEnum], 'Model');
Model.dispatch = v => v.values ? CaseEnum : CaseClass;

export default t.interface({
  routes: t.list(Route),
  models: t.list(Model)
}, 'IntermRep');
