import type { Meta, StoryObj } from "@storybook/react";
import {
    mockBaseRegisteredFields,
    mockHandleBlur,
    mockHandleChange
} from "@core/components/mocks/base-field-mocks";
import BaseFormField from "@core/components/layout/form/BaseFormField";
import {mockStore} from "@core/components/mocks/mock-store";


const meta: Meta<typeof BaseFormField> = {
    title: "form/BaseFormField",
    component: BaseFormField,
    parameters: {
        layout: "centered",
    },
};
export default meta;

type Story = StoryObj<typeof BaseFormField>;


// #region Button
export const Button: Story = {
    args: {
        fieldId: mockBaseRegisteredFields.baseButton,
        store: mockStore,
        handleChange: mockHandleChange,
        handleBlur: mockHandleBlur,
        hardDisable: false,
    },
};
// #endregion Button


// #region ButtonWithConfirm
export const ButtonWithConfirm: Story = {
    args: {
        fieldId: mockBaseRegisteredFields.baseButtonWithConfirm,
        store: mockStore,
        handleChange: mockHandleChange,
        handleBlur: mockHandleBlur,
        hardDisable: false,
    },
};
// #endregion ButtonWithConfirm


// #region Checkbox
export const Checkbox: Story = {
    args: {
        fieldId: mockBaseRegisteredFields.baseCheckbox,
        store: mockStore,
        handleChange: mockHandleChange,
        handleBlur: mockHandleBlur,
        hardDisable: false,
    },
};
// #endregion Checkbox


// #region FileInput
export const FileInput: Story = {
    args: {
        fieldId: mockBaseRegisteredFields.baseFileInput,
        store: mockStore,
        handleChange: mockHandleChange,
        handleBlur: mockHandleBlur,
        hardDisable: false,
    },
};
// #endregion FileInput


// #region Input
export const Input: Story = {
    args: {
        fieldId: mockBaseRegisteredFields.baseInput,
        store: mockStore,
        handleChange: mockHandleChange,
        handleBlur: mockHandleBlur,
        hardDisable: false,
    },
};
// #endregion Input


// #region Selector
export const Selector: Story = {
    args: {
        fieldId: mockBaseRegisteredFields.baseSelector,
        store: mockStore,
        handleChange: mockHandleChange,
        handleBlur: mockHandleBlur,
        hardDisable: false,
    },
};
// #endregion Selector


// #region Switch
export const Switch: Story = {
    args: {
        fieldId: mockBaseRegisteredFields.baseSwitch,
        store: mockStore,
        handleChange: mockHandleChange,
        handleBlur: mockHandleBlur,
        hardDisable: false,
    },
};
// #endregion Switch


// #region Toggle
export const Toggle: Story = {
    args: {
        fieldId: mockBaseRegisteredFields.baseToggle,
        store: mockStore,
        handleChange: mockHandleChange,
        handleBlur: mockHandleBlur,
        hardDisable: false,
    },
};
// #endregion Toggle


