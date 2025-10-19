import {buildFields, createFieldPlaceholders, formWrapper} from "@core/models/utils/base-model-utils";
import {lang} from "@core/text/utils/lang";
import BaseFieldTypesEnum from "@core/enums/base-field-type-enum";

// #region Initialization
export const mockBaseRegisteredFields = {
    baseButton: "baseButton",
    baseButtonWithConfirm: "baseButtonWithConfirm",
    baseCheckbox: "baseCheckbox",
    baseFileInput: "baseFileInput",
    baseInput: "baseInput",
    baseSelector: "baseSelector",
    baseSwitch: "baseSwitch",
    baseToggle: "baseToggle",
}

const text = lang();
const fields = createFieldPlaceholders(mockBaseRegisteredFields, text.mock);
const mockFormFields = formWrapper(fields);
// #endregion Initialization

// #region BaseButton
mockFormFields.baseButton.fieldType = BaseFieldTypesEnum.Button;
// #endregion BaseButton

// #region BaseButtonWithConfirm
mockFormFields.baseButtonWithConfirm.fieldType = BaseFieldTypesEnum.ButtonWithConfirmation;
mockFormFields.baseButtonWithConfirm.addit!.timeout = 5000;
mockFormFields.baseButtonWithConfirm.addit!.infoDescription = text.mock.baseButtonWithConfirmInfoDescription;
mockFormFields.baseButtonWithConfirm.addit!.confirmButtonLabel = text.mock.baseButtonWithConfirmConfirmButtonLabel;
mockFormFields.baseButtonWithConfirm.addit!.declineButtonLabel = text.mock.baseButtonWithConfirmDeclineButtonLabel;
// #endregion BaseButtonWithConfirm

// #region BaseButton
mockFormFields.baseCheckbox.fieldType = BaseFieldTypesEnum.CheckBox;
// #endregion BaseButton

// #region BaseFileInput
mockFormFields.baseFileInput.fieldType = BaseFieldTypesEnum.FileInput;
// #endregion BaseFileInput

// #region BaseInput
mockFormFields.baseInput.fieldType = BaseFieldTypesEnum.Input;
mockFormFields.baseInput.addit!.placeholder = text.mock.baseInputPlaceholder;
// #endregion BaseInput

// #region BaseSelector
mockFormFields.baseSelector.fieldType = BaseFieldTypesEnum.Select;
mockFormFields.baseSelector.addit!.placeholder = text.mock.baseInputPlaceholder;
mockFormFields.baseSelector.dataSource = () => {
    return text.mock.baseSelectorOptions;
}
// #endregion BaseSelector

// #region BaseSwitch
mockFormFields.baseSwitch.fieldType = BaseFieldTypesEnum.Switch;
// #endregion BaseSwitch

// #region BaseToggle
mockFormFields.baseToggle.fieldType = BaseFieldTypesEnum.Toggle;
// #endregion BaseToggle

export const mockFields = buildFields(mockFormFields);