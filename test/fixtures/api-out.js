export default [
  // GET /QCAnalyses : get ICQ QC Analyses related to a workcell processing module, linked to ICQ Assays with orderingStatus != Disabled
  {
    method: 'get',
    name: ['ICQMock', 'QCAnalysesOfModule'],
    authenticated: false,
    returnType: t.list(m.ICQQCAnalysis),
    route: (...routeParams) => ['QCAnalyses'].join('/'),
    routeParamTypes: [],
    params: {
      workcellSerialNumber: t.String,
      moduleId: t.Number
    }
  },

  // GET /QCAnalyses : get all ICQ workcell modules QC Analyses, linked to ICQ Assays with orderingStatus != Disabled
  {
    method: 'get',
    name: ['ICQMock', 'QCAnalyses'],
    authenticated: false,
    returnType: t.list(m.ICQQCAnalysis),
    route: (...routeParams) => ['QCAnalyses'].join('/'),
    routeParamTypes: [],
    params: {
      
    }
  },

  // GET /QCMaterials : get ICQ QC Materials related to a workcell processing module, linked to ICQ Assays with orderingStatus != Disabled
  {
    method: 'get',
    name: ['ICQMock', 'QCMaterialsOfModule'],
    authenticated: false,
    returnType: t.list(m.ICQQCMaterial),
    route: (...routeParams) => ['QCMaterials'].join('/'),
    routeParamTypes: [],
    params: {
      workcellSerialNumber: t.String,
      moduleId: t.Number
    }
  },

  // GET /QCMaterials : get all ICQ workcell modules QC Materials, linked to ICQ Assays with orderingStatus != Disabled
  {
    method: 'get',
    name: ['ICQMock', 'QCMaterials'],
    authenticated: false,
    returnType: t.list(m.ICQQCMaterial),
    route: (...routeParams) => ['QCMaterials'].join('/'),
    routeParamTypes: [],
    params: {
      
    }
  },

  // GET /alerts : get ICQ alerts, filtered by their category, related to a workcell processing module, RSM or SCC
  {
    method: 'get',
    name: ['ICQMock', 'alertsOfModuleOfCategory'],
    authenticated: false,
    returnType: t.list(m.ICQAlert),
    route: (...routeParams) => ['alerts'].join('/'),
    routeParamTypes: [],
    params: {
      workcellSerialNumber: t.String,
      moduleId: t.maybe(t.Number),
      category: m.ICQAlertCategory
    }
  },

  // GET /alerts : get ICQ alerts related to a workcell processing nodules, RSM or SCC
  {
    method: 'get',
    name: ['ICQMock', 'alertsOfModule'],
    authenticated: false,
    returnType: t.list(m.ICQAlert),
    route: (...routeParams) => ['alerts'].join('/'),
    routeParamTypes: [],
    params: {
      workcellSerialNumber: t.String,
      moduleId: t.maybe(t.Number)
    }
  },

  // GET /alerts : get ICQ alerts filtered by their category
  {
    method: 'get',
    name: ['ICQMock', 'alertsOfCategory'],
    authenticated: false,
    returnType: t.list(m.ICQAlert),
    route: (...routeParams) => ['alerts'].join('/'),
    routeParamTypes: [],
    params: {
      category: m.ICQAlertCategory
    }
  },

  // GET /alerts : get all ICQ alerts
  {
    method: 'get',
    name: ['ICQMock', 'alerts'],
    authenticated: false,
    returnType: t.list(m.ICQAlert),
    route: (...routeParams) => ['alerts'].join('/'),
    routeParamTypes: [],
    params: {
      
    }
  },

  // GET /calibrations : get ICQ calibrations related to a workcell processing module, linked to ICQ Assays with orderingStatus != Disabled
  {
    method: 'get',
    name: ['ICQMock', 'calibrationsOfModule'],
    authenticated: false,
    returnType: t.list(m.ICQCalibration),
    route: (...routeParams) => ['calibrations'].join('/'),
    routeParamTypes: [],
    params: {
      workcellSerialNumber: t.String,
      moduleId: t.Number
    }
  },

  // GET /calibrations : get all ICQ workcells modules calibrations, linked to ICQ Assays with orderingStatus != Disabled
  {
    method: 'get',
    name: ['ICQMock', 'calibrations'],
    authenticated: false,
    returnType: t.list(m.ICQCalibration),
    route: (...routeParams) => ['calibrations'].join('/'),
    routeParamTypes: [],
    params: {
      
    }
  },

  // GET /campings : get campings matching the requested coolness and size
  {
    method: 'get',
    name: ['campingController', 'getByCoolnessAndSize'],
    authenticated: false,
    returnType: t.list(m.Package),
    route: (...routeParams) => ['campings'].join('/'),
    routeParamTypes: [],
    params: {
      coolness: t.String,
      size: t.maybe(t.Number),
      nickname: t.String
    }
  },

  // GET /campings : get campings based on whether they're close to a beach
  {
    method: 'get',
    name: ['campingController', 'getByHasBeach'],
    authenticated: false,
    returnType: t.list(m.Package),
    route: (...routeParams) => ['campings'].join('/'),
    routeParamTypes: [],
    params: {
      hasBeach: t.Boolean
    }
  },

  // POST /campings : create a camping
  {
    method: 'post',
    name: ['campingController', 'create'],
    authenticated: false,
    returnType: m.Package,
    route: (...routeParams) => ['campings'].join('/'),
    routeParamTypes: [],
    params: {
      
    }
  },

  // GET /campings/ : get a camping by typed id
  {
    method: 'get',
    name: ['campingController', 'getByTypedId'],
    authenticated: true,
    returnType: m.Package,
    route: (...routeParams) => ['campings', routeParams[0]].join('/'),
    routeParamTypes: [m.LabOnlineId/*Id[m.Package]*/],
    params: {
      
    }
  },

  // GET /campings/by_query : get multiple campings by params with case class
  {
    method: 'get',
    name: ['campingController', 'getByQuery'],
    authenticated: false,
    returnType: t.list(m.Package),
    route: (...routeParams) => ['campings', 'by_query'].join('/'),
    routeParamTypes: [],
    params: {
      coolness: t.maybe(t.String),
      size: t.Number
    }
  },

  // GET /campings/ : get a camping by id
  {
    method: 'get',
    name: ['campingController', 'getById'],
    authenticated: true,
    returnType: m.Package,
    route: (...routeParams) => ['campings', routeParams[0]].join('/'),
    routeParamTypes: [t.Number],
    params: {
      
    }
  },

  // GET /health : System health check
  {
    method: 'get',
    name: ['healthCheckController', 'check'],
    authenticated: false,
    returnType: m.Health,
    route: (...routeParams) => ['health'].join('/'),
    routeParamTypes: [],
    params: {
      
    }
  },

  // GET /onBoardSolutions : get ICQ on-board solutions related to a workcell processing module
  {
    method: 'get',
    name: ['ICQMock', 'onBoardSolutionsOfModule'],
    authenticated: false,
    returnType: t.list(m.ICQOnBoardSolution),
    route: (...routeParams) => ['onBoardSolutions'].join('/'),
    routeParamTypes: [],
    params: {
      workcellSerialNumber: t.String,
      moduleId: t.Number
    }
  },

  // GET /onBoardSolutions : get all ICQ workcells modules on-board solutions
  {
    method: 'get',
    name: ['ICQMock', 'onBoardSolutions'],
    authenticated: false,
    returnType: t.list(m.ICQOnBoardSolution),
    route: (...routeParams) => ['onBoardSolutions'].join('/'),
    routeParamTypes: [],
    params: {
      
    }
  },

  // GET /something : gets something
  {
    method: 'get',
    name: ['campingController', 'something'],
    authenticated: false,
    returnType: t.list(m.Something),
    route: (...routeParams) => ['something'].join('/'),
    routeParamTypes: [],
    params: {
      
    }
  },

  // GET /workcells : get ICQ workcells information
  {
    method: 'get',
    name: ['ICQMock', 'workcell'],
    authenticated: false,
    returnType: m.ICQWorkcell,
    route: (...routeParams) => ['workcells'].join('/'),
    routeParamTypes: [],
    params: {
      
    }
  }
];