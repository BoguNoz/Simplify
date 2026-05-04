import {lang} from "@core/lib/lang";
import {buildFields, createFieldPlaceholders} from "@core/lib/base-model-utils";
import {isInteger, isNumber, isPositive} from "@core/events/validator";
import {ifFieldRequire} from "@core/events/dependency";

export const cameraSettingsRegisteredFields = {
    resolutionX: "resolutionX",
    resolutionY: "resolutionY",
    detectorSpectralRangeMax: "detectorSpectralRangeMax",
    detectorSpectralRangeMin: "detectorSpectralRangeMin",
    sensorGain: "sensorGain",
    sensorOffset: "sensorOffset",
} as const



// #region Initialization
const text = lang();
const fields = createFieldPlaceholders(cameraSettingsRegisteredFields, text.mock.form.cameraMetadata);
// #endregion Initialization


// #region Resolution
fields.resolutionX.isRequired = true;
fields.resolutionX.render = true;
fields.resolutionX.validators = [
    isInteger,
    isPositive,
];
fields.resolutionX.variant = "secondary"

fields.resolutionY.isRequired = true;
fields.resolutionY.render = true;
fields.resolutionY.validators = [
    isInteger,
    isPositive,
];
fields.resolutionY.variant = "secondary"
// #endregion Resolution

// #region DetectorSpectralRange
fields.detectorSpectralRangeMin.isRequired = true;
fields.detectorSpectralRangeMin.render = true;
fields.detectorSpectralRangeMin.validators = [
    isNumber,
    isPositive,
];
fields.detectorSpectralRangeMin.variant = "secondary"

fields.detectorSpectralRangeMax.isRequired = true;
fields.detectorSpectralRangeMax.render = true;
fields.detectorSpectralRangeMax.validators = [
    isNumber,
    isPositive,
];
fields.detectorSpectralRangeMax.variant = "secondary"
// #endregion DetectorSpectralRange

// #region SensorGain
fields.sensorGain.render = true;
fields.sensorGain.addit!.placeholder = "1.0"
fields.sensorGain.dependencies = [
    { fieldId: cameraSettingsRegisteredFields.resolutionX, events: [ifFieldRequire] },
]
fields.sensorGain.validators = [
    isPositive,
    isNumber,
];
fields.sensorGain.variant = "secondary"
// #endregion

// #region SensorOffset
fields.sensorOffset.render = true;
fields.sensorOffset.addit!.placeholder = "0"
fields.sensorOffset.dependencies = [
    { fieldId: cameraSettingsRegisteredFields.resolutionX, events: [ifFieldRequire] },
]
fields.sensorOffset.validators = [
    isNumber,
];
fields.sensorOffset.variant = "secondary"
// #endregion SensorOffset



export const sectionMock = buildFields(fields)