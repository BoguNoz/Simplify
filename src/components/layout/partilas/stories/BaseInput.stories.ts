import type { Meta, StoryObj } from "@storybook/react";
import {action} from "storybook/actions";
import {mockBaseRegisteredFields, mockFields} from "@core/components/mocks/base-field-mocks";
import BaseInput from "@core/components/layout/partilas/BaseInput";


const meta: Meta<typeof BaseInput> = {
    title: "partials/BaseInput",
    component: BaseInput,
    parameters: {
        layout: "centered",
    },
};
export default meta;

type Story = StoryObj<typeof BaseInput>;

const field = mockFields.find(bf => bf.id === mockBaseRegisteredFields.baseInput)!;

// #region Default
export const Default: Story = {
    args: {
        field: field,
        handleChange: action("handleChange"),
        handleBlur: action("handleBlur"),
        hardDisable: false,
    },
};
// #endregion Default

