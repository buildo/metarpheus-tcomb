import standardTypes from './standardTypes';

export default ({ overrides = {}, renameModel = v => v } = {}) => {
  const types = { ...standardTypes, ...overrides };
  const genType = (prefix = '') => tpe => {
    if (types[tpe.name]) {
      return types[tpe.name](tpe, { gen: genType(prefix), prefix });
    }
    return `${prefix}${renameModel(tpe.name)}`;
  };
  return genType;
};
