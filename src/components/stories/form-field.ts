import type { Meta, StoryObj } from "@storybook/react";
import {
    mockBaseRegisteredFields,
} from "@core/components/stories/base-field-mocks";
import FormField from "@core/components/layout/FormField";
import {mockStore} from "@core/components/stories/mock-store";


const meta: Meta<typeof FormField> = {
    title: "partials/FormField",
    component: FormField,
    parameters: {
        layout: "centered",
    },
};
export default meta;

type Story = StoryObj<typeof FormField>;


// #region Button
export const Button: Story = {
    args: {
        fieldId: mockBaseRegisteredFields.baseButton,
        store: mockStore,
        hardDisable: false,
    },
};
// #endregion Button


// #region ButtonWithConfirm
export const ButtonWithConfirm: Story = {
    args: {
        fieldId: mockBaseRegisteredFields.baseButtonWithConfirm,
        store: mockStore,
        hardDisable: false,
    },
};
// #endregion ButtonWithConfirm


// #region Checkbox
export const Checkbox: Story = {
    args: {
        fieldId: mockBaseRegisteredFields.baseCheckbox,
        store: mockStore,
        hardDisable: false,
    },
};
// #endregion Checkbox


// #region FileInput
export const FileInput: Story = {
    args: {
        fieldId: mockBaseRegisteredFields.baseFileInput,
        store: mockStore,
        hardDisable: false,
    },
};
// #endregion FileInput


// #region Input
export const Input: Story = {
    args: {
        fieldId: mockBaseRegisteredFields.baseInput,
        store: mockStore,
        hardDisable: false,
    },
};
// #endregion Input


// #region Selector
export const Selector: Story = {
    args: {
        fieldId: mockBaseRegisteredFields.baseSelector,
        store: mockStore,
        hardDisable: false,
    },
};
// #endregion Selector


// #region Switch
export const Switch: Story = {
    args: {
        fieldId: mockBaseRegisteredFields.baseSwitch,
        store: mockStore,
        hardDisable: false,
    },
};
// #endregion Switch


// #region Toggle
export const Toggle: Story = {
    args: {
        fieldId: mockBaseRegisteredFields.baseToggle,
        store: mockStore,
        hardDisable: false,
    },
};
// #endregion Toggle


