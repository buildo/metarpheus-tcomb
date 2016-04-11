import standardTypes from './standardTypes';

export default overrides => {
  const types = { ...standardTypes, ...overrides };
  const genType = (prefix = '') => tpe => {
    if (types[tpe.name]) {
      return types[tpe.name](tpe, { gen: genType(prefix), prefix });
    }
    return `${prefix}${tpe.name}`;
  };
  return genType;
};
