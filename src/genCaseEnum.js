export default ({ renameModel = v => v } = {}) => ({ name, values }) => () => `${renameModel(name)}.define(t.enums.of([
  ${
    values.map(({ name, desc }) => (
      `${desc ? `// ${desc}\n  ` : ''}'${name}'`
    )).join(',\n  ')
  }
]));`;
