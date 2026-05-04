import {lang} from "@core/lib/lang";
import {buildFields, createFieldPlaceholders} from "@core/lib/base-model-utils";
import { BaseFieldTypesEnum } from "@core/models/enums/base-field-type-enum";
import {mockStore} from "@core/components/stories/mock-store";
import {toggleRendering} from "@core/events/operation";
import {isInteger, isNumber, isPositive} from "@core/events/validator";
import {BaseStore} from "@core/stores/base-store";
import {isNullEmptyFalseOrUndefined} from "@core/lib/utils";
import {ifFieldRequire} from "@core/events/dependency";

export const cameraSettingsRegisteredFields = {
    resolutionX: "resolutionX",
    resolutionY: "resolutionY",
    detectorSpectralRangeMax: "detectorSpectralRangeMax",
    detectorSpectralRangeMin: "detectorSpectralRangeMin",
    sensorGain: "sensorGain",
    sensorOffset: "sensorOffset",
} as const


export const cameraMetadataRegisteredFields = {
    profileSwitch: "profileSwitch",
    profileSelector: "profileSelector",
    ...cameraSettingsRegisteredFields,
    flatFieldCorrectionMatrix: "flatFieldCorrectionMatrix",
    darkFrameImage: "darkFrameImage",
} as const

// #region Initialization
const text = lang();
const fields = createFieldPlaceholders(cameraMetadataRegisteredFields, text.mock.form.cameraMetadata);
// #endregion Initialization

// #region ProfileSwitch
fields.profileSwitch.fieldType = BaseFieldTypesEnum.Switch;
fields.profileSwitch.variant = "outline";
fields.profileSwitch.operations = [
    toggleRendering([
        cameraMetadataRegisteredFields.profileSelector,
        cameraMetadataRegisteredFields.resolutionX,
        cameraMetadataRegisteredFields.resolutionY,
        cameraMetadataRegisteredFields.detectorSpectralRangeMin,
        cameraMetadataRegisteredFields.detectorSpectralRangeMax,
        cameraMetadataRegisteredFields.sensorGain,
        cameraMetadataRegisteredFields.sensorOffset,
    ], mockStore)
]
// #endregion ProfileSwitch

// #region ProfileSelector
fields.profileSelector.fieldType = BaseFieldTypesEnum.Select;
fields.profileSelector.isRequired = true;
fields.profileSelector.dataSource = async () => {
    const keys = ["Base Camera Profile", "Experimental Camera Profile", "New Camera Profile"];
    return keys.filter(k => k);
}
fields.profileSelector.deconstructor = (callback: () => void) => {
    const eventName = "localforage-changed";
    window.addEventListener(eventName, callback);
    return () => window.removeEventListener(eventName, callback);
}
// #endregion ProfileSelector

// #region Resolution
fields.resolutionX.isRequired = true;
fields.resolutionX.render = false;
fields.resolutionX.validators = [
    isInteger,
    isPositive,
];

fields.resolutionY.isRequired = true;
fields.resolutionY.render = false;
fields.resolutionY.validators = [
    isInteger,
    isPositive,
];
// #endregion Resolution

// #region DetectorSpectralRange
fields.detectorSpectralRangeMin.isRequired = true;
fields.detectorSpectralRangeMin.render = false;
fields.detectorSpectralRangeMin.validators = [
    isNumber,
    isPositive,
];

fields.detectorSpectralRangeMax.isRequired = true;
fields.detectorSpectralRangeMax.render = false;
fields.detectorSpectralRangeMax.validators = [
    isNumber,
    isPositive,
];
// #endregion DetectorSpectralRange

export const isFieldEditable = async (target: string, master: string, store: BaseStore): Promise<void> => {
    const field = store.fields[target];

    const resolutionXValue = store.getFieldValue(cameraMetadataRegisteredFields.resolutionX);
    const resolutionYValue = store.getFieldValue(cameraMetadataRegisteredFields.resolutionY);

    field.isDisabled = isNullEmptyFalseOrUndefined(resolutionXValue)
        || isNullEmptyFalseOrUndefined(resolutionYValue)
}

// #region FlatField
fields.flatFieldCorrectionMatrix.fieldType = BaseFieldTypesEnum.FileInput;
fields.flatFieldCorrectionMatrix.isDisabled = true;
fields.flatFieldCorrectionMatrix.dependencies = [
    { fieldId: cameraMetadataRegisteredFields.resolutionX, events: [isFieldEditable]},
    { fieldId: cameraMetadataRegisteredFields.resolutionY, events: [isFieldEditable] },
];
// #endregion FlatField

// #region DarkFrame
fields.darkFrameImage.fieldType = BaseFieldTypesEnum.FileInput;
fields.darkFrameImage.isDisabled = true;
fields.darkFrameImage.dependencies = [
    { fieldId: cameraMetadataRegisteredFields.resolutionX, events: [isFieldEditable] },
    { fieldId: cameraMetadataRegisteredFields.resolutionY, events: [isFieldEditable] },
];
// #endregion DarkFrame

// #region SensorGain
fields.sensorGain.render = false;
fields.sensorGain.addit!.placeholder = "1.0"
fields.sensorGain.dependencies = [
    { fieldId: cameraMetadataRegisteredFields.resolutionX, events: [ifFieldRequire] },
]
fields.sensorGain.validators = [
    isPositive,
    isNumber,
];
// #endregion

// #region SensorOffset
fields.sensorOffset.render = false;
fields.sensorOffset.addit!.placeholder = "0"
fields.sensorOffset.dependencies = [
    { fieldId: cameraMetadataRegisteredFields.resolutionX, events: [ifFieldRequire] },
]
fields.sensorOffset.validators = [
    isNumber,
];
// #endregion SensorOffset



export const formMock = buildFields(fields)