export default {
  Int: () => 't.Number',
  Float: () => 't.Number',
  String: () => 't.String',
  Boolean: () => 't.Boolean',
  Date: () => 't.String',
  DateTime: () => 't.String',
  List: ({ args: [tpe] }, { gen }) => `t.list(${gen(tpe)})`,
  Option: ({ args: [tpe] }, { gen }) => `t.maybe(${gen(tpe)})`
};
