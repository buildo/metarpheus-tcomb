// Health
export const Health = t.define('Health');

export const ICQAlert = t.define('ICQAlert');

export const ICQAlertCategory = t.define('ICQAlertCategory');

export const ICQAssayReference = t.define('ICQAssayReference');

export const ICQCalibration = t.define('ICQCalibration');

export const ICQCalibrationMethod = t.define('ICQCalibrationMethod');

export const ICQCalibrationType = t.define('ICQCalibrationType');

export const ICQCalibrationStatus = t.define('ICQCalibrationStatus');

export const ICQOnBoardSolution = t.define('ICQOnBoardSolution');

export const ICQProcessingModule = t.define('ICQProcessingModule');

export const ICQModuleType = t.define('ICQModuleType');

export const ICQModuleStatus = t.define('ICQModuleStatus');

export const ICQOverallStatus = t.define('ICQOverallStatus');

export const ICQQCAnalysis = t.define('ICQQCAnalysis');

export const ICQQCAnalysisStatus = t.define('ICQQCAnalysisStatus');

export const ICQQCMaterial = t.define('ICQQCMaterial');

export const ICQQCMaterialStatus = t.define('ICQQCMaterialStatus');

export const ICQReagentStatus = t.define('ICQReagentStatus');

export const ICQReagentCartridgeStatus = t.define('ICQReagentCartridgeStatus');

export const ICQRSM = t.define('ICQRSM');

export const ICQRSMStatus = t.define('ICQRSMStatus');

export const ICQWorkcell = t.define('ICQWorkcell');

export const ICQConnectionStatus = t.define('ICQConnectionStatus');

export const ICQPrinterStatus = t.define('ICQPrinterStatus');

// Represents a camping site
export const Camping = t.define('Camping');

// Location of the camping site
export const CampingLocation = t.define('CampingLocation');

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
