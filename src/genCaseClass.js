export default ({ genType, renameModel = v => v }) => ({ name, members }) => () => `${renameModel(name)}.define(t.struct({
  ${
    members.map(({ name, tpe, desc }) => (
      `${desc ? `// ${desc}\n  ` : ''}${name}: ${genType()(tpe)}`
    )).join(',\n  ')
  }
}));`;
