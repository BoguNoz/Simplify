import type { Meta, StoryObj } from "@storybook/react";
import {action} from "storybook/actions";
import {
    mockBaseRegisteredFields,
    mockFields,
    mockHandleBlur,
    mockHandleChange
} from "@core/components/mocks/base-field-mocks";
import BaseFileInput from "@core/components/layout/partilas/BaseFileInput";


const meta: Meta<typeof BaseFileInput> = {
    title: "partials/BaseFileInput",
    component: BaseFileInput,
    parameters: {
        layout: "centered",
    },
};
export default meta;

type Story = StoryObj<typeof BaseFileInput>;

const field = mockFields.find(bf => bf.id === mockBaseRegisteredFields.baseFileInput)!;

// #region Default
export const Default: Story = {
    args: {
        field: field,
        handleChange: mockHandleChange,
        hardDisable: false,
    },
};
// #endregion Default

