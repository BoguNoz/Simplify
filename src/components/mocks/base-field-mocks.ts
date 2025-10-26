import {buildFields, createFieldPlaceholders} from "@core/models/utils/base-model-utils";
import {lang} from "@core/text/utils/lang";
import BaseFieldTypesEnum from "@core/enums/base-field-type-enum";
import {mockStore} from "@core/components/mocks/mock-store";
import {isInteger} from "@core/events/validator";


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
// #endregion Initialization

// #region BaseButton
fields.baseButton.fieldType = BaseFieldTypesEnum.Button;
fields.baseButton.isRequired = true;
// #endregion BaseButton

// #region BaseButtonWithConfirm
fields.baseButtonWithConfirm.fieldType = BaseFieldTypesEnum.ButtonWithConfirmation;
fields.baseButtonWithConfirm.isRequired = true;
// #endregion BaseButtonWithConfirm

// #region BaseCheckbox
fields.baseCheckbox.fieldType = BaseFieldTypesEnum.CheckBox;
fields.baseCheckbox.isRequired = true;
// #endregion BaseCheckbox

// #region BaseFileInput
fields.baseFileInput.fieldType = BaseFieldTypesEnum.FileInput;
fields.baseFileInput.isRequired = true;
// #endregion BaseFileInput

// #region BaseInput
fields.baseInput.fieldType = BaseFieldTypesEnum.Input;
fields.baseInput.isRequired = true;
fields.baseInput.validators = [isInteger]
fields.baseInput.addit!.placeholder = text.mock.baseInputPlaceholder;
// #endregion BaseInput

// #region BaseSelector
fields.baseSelector.fieldType = BaseFieldTypesEnum.Select;
fields.baseSelector.isRequired = true;
fields.baseSelector.dataSource = () => {
    return text.mock.baseSelectorOptions;
}
// #endregion BaseSelector

// #region BaseSwitch
fields.baseSwitch.fieldType = BaseFieldTypesEnum.Switch;
fields.baseSwitch.isRequired = true;
// #endregion BaseSwitch

// #region BaseToggle
fields.baseToggle.fieldType = BaseFieldTypesEnum.Toggle;
fields.baseToggle.isRequired = true;
// #endregion BaseToggle

export const mockFields = buildFields(fields);

// #region StoreMock
await mockStore.initializeFields(mockFields);
// #endregion StoreMock

// #region FormMocks
export const mockHandleBlur = async (fieldId: string) => {
    mockStore.validateField(fieldId);
};

export const mockHandleChange = async (fieldId: string, value: any) => {
    await mockStore.setFieldValue(fieldId, value);
};
// #endregion FormMocks