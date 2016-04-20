// Health
export const Health = t.declare('Health');

export const ICQAlert = t.declare('ICQAlert');

export const ICQAlertCategory = t.declare('ICQAlertCategory');

export const ICQAssayReference = t.declare('ICQAssayReference');

export const ICQCalibration = t.declare('ICQCalibration');

export const ICQCalibrationMethod = t.declare('ICQCalibrationMethod');

export const ICQCalibrationType = t.declare('ICQCalibrationType');

export const ICQCalibrationStatus = t.declare('ICQCalibrationStatus');

export const ICQOnBoardSolution = t.declare('ICQOnBoardSolution');

export const ICQProcessingModule = t.declare('ICQProcessingModule');

export const ICQModuleType = t.declare('ICQModuleType');

export const ICQModuleStatus = t.declare('ICQModuleStatus');

export const ICQOverallStatus = t.declare('ICQOverallStatus');

export const ICQQCAnalysis = t.declare('ICQQCAnalysis');

export const ICQQCAnalysisStatus = t.declare('ICQQCAnalysisStatus');

export const ICQQCMaterial = t.declare('ICQQCMaterial');

export const ICQQCMaterialStatus = t.declare('ICQQCMaterialStatus');

export const ICQReagentStatus = t.declare('ICQReagentStatus');

export const ICQReagentCartridgeStatus = t.declare('ICQReagentCartridgeStatus');

export const ICQRSM = t.declare('ICQRSM');

export const ICQRSMStatus = t.declare('ICQRSMStatus');

export const ICQWorkcell = t.declare('ICQWorkcell');

export const ICQConnectionStatus = t.declare('ICQConnectionStatus');

export const ICQPrinterStatus = t.declare('ICQPrinterStatus');

// Represents a camping site
export const Camping = t.declare('Camping');

// Location of the camping site
export const CampingLocation = t.declare('CampingLocation');

Health.define(t.struct({
  // Name of the service.
  id: t.String,
  // Version of the service.
  version: t.String,
  // Current UTC date and time of the request, in ISO 8601 format.
  currentAsOfUtc: LabOnlineDate
}));

ICQAlert.define(t.struct({
  _moduleId: t.Number,
  moduleName: t.String,
  _workcellSerialNumber: t.String,
  workcellName: t.String,
  AIMCode: t.Number,
  AIMSubCode: t.maybe(t.Number),
  alertDateTime: LabOnlineDate,
  category: ICQAlertCategory,
  description: t.String
}));

ICQAlertCategory.define(t.enums.of([
  'Critical',
  'Alert',
  'Notification'
]));

ICQAssayReference.define(t.struct({
  _number: t.Number,
  _version: t.Number
}));

ICQCalibration.define(t.struct({
  _moduleId: t.Number,
  moduleName: t.String,
  _workcellSerialNumber: t.String,
  workcellName: t.String,
  assayReference: ICQAssayReference,
  assayName: t.String,
  reagentLotNumber: t.String,
  calibratorLotNumber: t.String,
  method: ICQCalibrationMethod,
  type: ICQCalibrationType,
  calibrationDateTime: t.maybe(LabOnlineDate),
  expirationDateTime: t.maybe(LabOnlineDate),
  status: ICQCalibrationStatus,
  user: t.maybe(t.String)
}));

ICQCalibrationMethod.define(t.enums.of([
  'Qual1Point',
  'Qual2Point',
  'CalValueReference',
  'ICT',
  'Exponential',
  'Linear',
  'Spline',
  'ABS',
  'Factor',
  'UseFactor',
  'UseFactorBlank',
  'PLC4Y',
  'PLC4X',
  'PLC4XTransform',
  'PLC5Y',
  'PLC5X',
  'PLC5XTransform',
  'PointToPoint',
  'IAReference',
  'Logit-4',
  'Logit-5'
]));

ICQCalibrationType.define(t.enums.of([
  'Full',
  'Adjust'
]));

ICQCalibrationStatus.define(t.enums.of([
  'NoCal',
  'Ok',
  'Failed',
  'Expired',
  'Overridden',
  'OverriddenLot',
  'PendingQC',
  'InProcess'
]));

ICQOnBoardSolution.define(t.struct({
  _moduleId: t.Number,
  moduleName: t.String,
  _workcellSerialNumber: t.String,
  workcellName: t.String,
  _lotNumber: t.String,
  _serialNumber: t.String,
  configurationId: t.String,
  configurationVersion: t.Number,
  expirationDate: LabOnlineDate,
  carouselPosition: t.maybe(t.Number),
  RSMPosition: t.maybe(t.Number),
  percentOfRemainingVolume: t.Number,
  remainingHoursOfOnBoardStability: t.maybe(t.Number),
  status: ICQReagentStatus,
  cartridgeStatus: ICQReagentCartridgeStatus
}));

ICQProcessingModule.define(t.struct({
  _id: t.Number,
  serialNumber: t.String,
  type: ICQModuleType,
  name: t.String,
  overallStatus: ICQOverallStatus,
  status: ICQModuleStatus,
  numberOfTestsInProgress: t.Number,
  reagentOverallStatus: ICQOverallStatus,
  supplyOverallStatus: ICQOverallStatus,
  calibrationOverallStatus: ICQOverallStatus,
  QCAnalysisOverallStatus: ICQOverallStatus,
  maintenanceOverallStatus: ICQOverallStatus
}));

ICQModuleType.define(t.enums.of([
  'IA',
  'CC'
]));

ICQModuleStatus.define(t.enums.of([
  'Offline',
  'Stopped',
  'Initializing',
  'Warming',
  'Idle',
  'Running',
  'Processing',
  'Pausing',
  'Maintenance'
]));

ICQOverallStatus.define(t.enums.of([
  'Ok',
  'Warning',
  'Error'
]));

ICQQCAnalysis.define(t.struct({
  _moduleId: t.Number,
  moduleName: t.String,
  _workcellSerialNumber: t.String,
  workcellName: t.String,
  assayReference: ICQAssayReference,
  assayName: t.String,
  controlSetName: t.String,
  controlLevelName: t.String,
  controlLotNumber: t.String,
  assayQCStatus: ICQQCAnalysisStatus
}));

ICQQCAnalysisStatus.define(t.enums.of([
  'Success',
  'QCOutOfRange',
  'WestgardWarning',
  'WestgardFailure'
]));

ICQQCMaterial.define(t.struct({
  _moduleId: t.Number,
  moduleName: t.String,
  _workcellSerialNumber: t.String,
  workcellName: t.String,
  assayReferences: t.list(ICQAssayReference),
  assayNames: t.list(t.String),
  _setName: t.String,
  _levelName: t.String,
  _lotNumber: t.String,
  _serialNumber: t.String,
  carouselPosition: t.maybe(t.Number),
  RSMPosition: t.maybe(t.Number),
  rackId: t.String,
  rackPosition: t.Number,
  percentVolumeRemaining: t.Number,
  materialExpirationDate: LabOnlineDate,
  remainingHoursOfOnBoardStability: t.Number,
  remainingMinutesOfInUseStability: t.maybe(t.Number),
  status: ICQQCMaterialStatus
}));

ICQQCMaterialStatus.define(t.enums.of([
  'Ok',
  'LowAlert',
  'Empty',
  'Expired',
  'Overridden'
]));

ICQReagentStatus.define(t.enums.of([
  'Ok',
  'Mixing',
  'Overridden',
  'Disabled',
  'LowAlert',
  'Expired',
  'ExpiredError',
  'Empty',
  'NoAssay',
  'PickError',
  'PlaceError',
  'LoadError',
  'Incomplete',
  'BCFail',
  'Undefined'
]));

ICQReagentCartridgeStatus.define(t.enums.of([
  'Ok',
  'UnloadError',
  'LoadError',
  'ScheduledUnload',
  'ScheduledLoad',
  'PartiallyUnloaded',
  'Scanning',
  'Unloading',
  'Loading'
]));

ICQRSM.define(t.struct({
  serialNumber: t.String,
  name: t.String,
  overallStatus: ICQOverallStatus,
  status: ICQRSMStatus
}));

ICQRSMStatus.define(t.enums.of([
  'Offline',
  'Stopped',
  'Initializing',
  'Idle',
  'Running',
  'Pausing',
  'Maintenance'
]));

ICQWorkcell.define(t.struct({
  _serialNumber: t.String,
  name: t.String,
  numberOfSamples: t.Number,
  numberOfResultsPending: t.Number,
  numberOfExceptions: t.Number,
  LISConnectionStatus: ICQConnectionStatus,
  LASConnectionStatus: ICQConnectionStatus,
  AbbottLinkConnectionStatus: ICQConnectionStatus,
  PrinterConnectionStatus: ICQPrinterStatus,
  currentUser: t.String,
  processingModules: t.list(ICQProcessingModule),
  RSM: ICQRSM
}));

ICQConnectionStatus.define(t.enums.of([
  'Connected',
  'NotConnected',
  'NotConfigured'
]));

ICQPrinterStatus.define(t.enums.of([
  'NoError',
  'Warning',
  'Error',
  'NotConfigured'
]));

Camping.define(t.struct({
  // camping name
  name: t.String,
  // number of tents
  size: t.Number,
  // camping location
  location: CampingLocation
}));

CampingLocation.define(t.enums.of([
  // Near the sea
  'Seaside',
  // High up
  'Mountains'
]));
