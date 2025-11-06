import type { Meta, StoryObj } from "@storybook/react";
import {action} from "storybook/actions";
import {
    mockBaseRegisteredFields,
    mockFields,
    mockHandleBlur,
    mockHandleChange
} from "@core/components/mocks/base-field-mocks";
import BaseCheckbox from "@core/components/layout/partilas/BaseCheckbox";


const meta: Meta<typeof BaseCheckbox> = {
    title: "partials/BaseCheckbox",
    component: BaseCheckbox,
    parameters: {
        layout: "centered",
    },
};
export default meta;

type Story = StoryObj<typeof BaseCheckbox>;

const field = mockFields.find(bf => bf.id === mockBaseRegisteredFields.baseCheckbox)!;

// #region Default
export const Default: Story = {
    args: {
        field: field,
        handleChange: mockHandleChange,
        handleBlur: mockHandleBlur,
        hardDisable: false,
    },
};
// #endregion Default

