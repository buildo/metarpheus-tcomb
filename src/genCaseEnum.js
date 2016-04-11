export default ({ name, values }) => () => `${name}.define(t.enums.of([
  ${
    values.map(({ name, desc }) => (
      `${desc ? `// ${desc}\n  ` : ''}'${name}'`
    )).join(',\n  ')
  }
]));`;
