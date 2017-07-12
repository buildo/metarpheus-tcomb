const List = ({ args: [tpe] }, { gen }) => `t.list(${gen(tpe)})`;

export default {
  Int: () => 't.Number',
  Float: () => 't.Number',
  String: () => 't.String',
  Boolean: () => 't.Boolean',
  Date: () => 't.String',
  DateTime: () => 't.String',
  List,
  Option: ({ args: [tpe] }, { gen }) => `t.maybe(${gen(tpe)})`,
  Set: List,
  TreeSet: List,
  Map: ({ args: [k, v] }, { gen }) => `t.dict(${gen(k)}, ${gen(v)})`,
  Unit: () => 't.Nil'
};
