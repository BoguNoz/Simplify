import type { Meta, StoryObj } from "@storybook/react";
import BaseButtonWithConfirmation from "@core/components/layout/partials/BaseButtonWithConfirmation";
import {
    mockBaseRegisteredFields,
    mockFields,
} from "@core/components/stories/base-field-mocks";


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
        hardDisable: false,
    },
};
// #endregion Default

