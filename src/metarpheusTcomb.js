import t from 'tcomb';
import { StringSegment, ParamSegment, CaseEnum, CaseClass } from './IntermRep';
import _genType from './genType';
import genCaseEnum from './genCaseEnum';
import _genCaseClass from './genCaseClass';

export default function metarpheusTcomb({
  overrides, intermRep: { routes, models }, modelPrelude, apiPrelude, apiModelPrefix
}) {
  const genType = _genType(overrides);
  const genCaseClass = _genCaseClass(genType);

  const declareModels = models.map(({ name, desc = '' }) => {
    return `${desc ? `// ${desc}\n` : ''}export const ${name} = t.define('${name}');
`;
  }).join('\n');

  const defineModels = models.map(model => t.match(model,
    CaseEnum, genCaseEnum(model),
    CaseClass, genCaseClass(model)
  )).join(`

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
        ${params.map(({ name, tpe }) => `${name}: ${genTypeM(tpe)}`).join(`,
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
