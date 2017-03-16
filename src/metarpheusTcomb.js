import t from 'tcomb';
import sortBy from 'lodash/sortBy';
import sortedUniqBy from 'lodash/sortedUniqBy';
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
  if (sortedUniqBy(models, ({ name }) => name).length !== models.length) {
    throw new Error('Duplicate model found in intermRep');
  }
  const routes = sortBy(_routes, ({ route }) => route.map(
    s => StringSegment.is(s) ? s.str : (s.routeParam.name || ':param')
  ).join(''));

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

  const generateParams = params => params.map(({ name, tpe: _tpe, required = true }) => {
    // handle optional parameters:
    const tpe = required ? _tpe : Tpe({ name: 'Option', args: [_tpe] });
    return `${name}: ${genTypeM(tpe)}`;
  }).join(`,
      `);

  const apiRoutes = routes.map(({
    method, authenticated, route,
    ctrl, params: _params, body: _body, desc = '', returns
  }) => {
    const queryParams = _params.filter(({ inBody = false }) => !inBody);
    const bodyParams = _params.filter(({ inBody }) => inBody);
    const body = _body ? genTypeM(_body.tpe) : bodyParams.length > 0 ? `t.interface({
      ${generateParams(bodyParams)}
    })` : null;
    return `  // ${method.toUpperCase()} /${route.map(r => r.str).join('/')} : ${desc}
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
      ${generateParams(queryParams)}
    }${body ? `,
    body: ${body}` : ''}
  }`;
  }).join(`,

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
