export default genType => ({ name, members }) => () => `${name}.define(t.struct({
  ${
    members.map(({ name, tpe, desc }) => (
      `${desc ? `// ${desc}\n  ` : ''}${name}: ${genType()(tpe)}`
    )).join(',\n  ')
  }
}));`;
