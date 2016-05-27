import t from 'tcomb';
import sortBy from 'lodash/sortBy';
import { StringSegment, ParamSegment, CaseEnum, CaseClass, Tpe } from './IntermRep';
import _genType from './genType';
import _genCaseEnum from './genCaseEnum';
import _genCaseClass from './genCaseClass';

export default function metarpheusTcomb({
  overrides, intermRep: {
    routes: _routes, models: _models
  }, modelPrelude, apiPrelude, apiModelPrefix, renameModel = v => v
}) {
  const genType = _genType({ overrides, renameModel });
  const genCaseClass = _genCaseClass({ genType, renameModel });
  const genCaseEnum = _genCaseEnum({ renameModel });

  const models = sortBy(_models, ({ name }) => renameModel(name));
  const routes = sortBy(_routes, ({ ctrl }) => ctrl.join(''));

  const declareModels = models.map(({ name, desc = '' }) => {
    return `${desc ? `// ${desc}\n` : ''}export const ${renameModel(name)} = t.declare('${renameModel(name)}');
`;
  }).join('\n');

  const defineModels = models.map(model => {
    // allow overriding top level models
    const name = renameModel(model.name);
    if (overrides[name]) {
      return `${name}.define(${genType()(Tpe({ name }))})`;
    }

    return t.match(model,
      CaseEnum, genCaseEnum(model),
      CaseClass, genCaseClass(model)
    );
  }).join(`

`);

  const genTypeM = genType(apiModelPrefix);

  const apiRoutes = routes.map(({
    method, authenticated, route,
    ctrl, params, desc = '', returns
  }) => `  // ${method.toUpperCase()} /${route.map(r => r.str).join('/')} : ${desc}
  {
    method: '${method}',
    name: [${ctrl.map(s => `'${s}'`).join(', ')}],
    authenticated: ${authenticated},
    returnType: ${genTypeM(returns)},
    route: (...routeParams) => [${(() => {
      let c = 0;
      return route.map(
        s => StringSegment.is(s) ? `'${s.str}'` : `routeParams[${c++}]` // eslint-disable-line no-plusplus
      ).join(', ');
    })()}].join('/'),
    routeParamTypes: [${route.filter(ParamSegment.is).map(({
      routeParam: { tpe }
    }) => genTypeM(tpe)).join(', ')}],
    params: {
      ${params.map(({ name, tpe: _tpe, required = true }) => {
        // handle optional query parameters:
        const tpe = required ? _tpe : Tpe({ name: 'Option', args: [_tpe] });
        return `${name}: ${genTypeM(tpe)}`;
      }).join(`,
      `)}
    }
  }`).join(`,

`);

  const model = `
${modelPrelude}

${declareModels}
${defineModels}
  `;

  const api = `
${apiPrelude}

export default [
${apiRoutes}
];
`;

  return { model, api };
}
