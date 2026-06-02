import {buildFields, createFieldPlaceholders} from "@core/lib/base-model-utils";
import {lang} from "@core/lib/lang";
import { BaseFieldTypesEnum } from "@core/models/enums/base-field-type-enum";
import {mockStore} from "@core/components/stories/mock-store";
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
    dataTable: "dataTable",
}

const text = lang();
// @ts-ignore
const fields = createFieldPlaceholders(mockBaseRegisteredFields, text.mock);
// #endregion Initialization

// #region BaseStatusButton
fields.baseButton.fieldType = BaseFieldTypesEnum.StatusButton;
// #endregion BaseStatusButton

// #region BaseButtonWithConfirm
fields.baseButtonWithConfirm.fieldType = BaseFieldTypesEnum.ButtonWithConfirmation;
// #endregion BaseButtonWithConfirm

// #region BaseCheckbox
fields.baseCheckbox.fieldType = BaseFieldTypesEnum.CheckBox;
fields.baseCheckbox.variant = "outline";
// #endregion BaseCheckbox

// #region BaseFileInput
fields.baseFileInput.fieldType = BaseFieldTypesEnum.FileInput;
// #endregion BaseFileInput

// #region BaseInput
fields.baseInput.fieldType = BaseFieldTypesEnum.Input;
fields.baseInput.validators = [isInteger]
fields.baseInput.addit!.placeholder = text.mock.baseInputPlaceholder;
// #endregion BaseInput

// #region BaseSelector
fields.baseSelector.fieldType = BaseFieldTypesEnum.Select;
fields.baseSelector.dataSource = () => {
    return text.mock.baseSelectorOptions;
}
// #endregion BaseSelector

// #region BaseSwitch
fields.baseSwitch.fieldType = BaseFieldTypesEnum.Switch;
// #endregion BaseSwitch

// #region BaseToggle
fields.baseToggle.fieldType = BaseFieldTypesEnum.Toggle;
// #endregion BaseToggle


// #region BaseDataTable
fields.dataTable.fieldType = BaseFieldTypesEnum.DataTable;
fields.dataTable.dataSource = () => {
    return [
        {
            id: "1",
            name: "John Doe",
            age: 28,
            email: "john.doe@mail.com",
        },
        {
            id: "2",
            name: "Anna Kowalska",
            age: 34,
            email: "anna.kowalska@mail.com",
        },
        {
            id: "3",
            name: "Piotr Nowak",
            age: 41,
            email: "piotr.nowak@mail.com",
        },
    ];
}
// #endregion BaseDataTable

export const mockFields = buildFields(fields);

// #region StoreMock
await mockStore.initializeFields(mockFields);
// #endregion StoreMock
