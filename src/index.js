import metarpheusTcomb from './metarpheusTcomb';
import IntermRep from './IntermRep';
import Config from './Config';

export default function({ intermRep: _intermRep, config }) {
  const {
    modelPrelude = `// DO NOT EDIT MANUALLY - metarpheus-generated

  `,
    apiPrelude = `// DO NOT EDIT MANUALLY - metarpheus-generated

  `,
    apiModelPrefix = '',
    overrides = {},
    renameModel = v => v
  } = Config(config);

  const intermRep = IntermRep(_intermRep);

  return metarpheusTcomb({ intermRep, overrides, modelPrelude, apiPrelude, apiModelPrefix, renameModel });
}
