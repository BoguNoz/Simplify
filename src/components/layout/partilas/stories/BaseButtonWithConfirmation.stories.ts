import type { Meta, StoryObj } from "@storybook/react";
import BaseButtonWithConfirmation from "@core/components/layout/partilas/BaseButtonWithConfirmation";
import {action} from "storybook/actions";
import {mockBaseRegisteredFields, mockFields} from "@core/components/mocks/base-field-mocks";


const meta: Meta<typeof BaseButtonWithConfirmation> = {
    title: "partials/BaseButtonWithConfirmation",
    component: BaseButtonWithConfirmation,
    parameters: {
        layout: "centered",
    },
};
export default meta;

type Story = StoryObj<typeof BaseButtonWithConfirmation>;

const field = mockFields.find(bf => bf.id === mockBaseRegisteredFields.baseButtonWithConfirm)!;

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

