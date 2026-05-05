import type { Meta, StoryObj } from "@storybook/react";
import {
    mockBaseRegisteredFields,
    mockFields,
} from "@core/components/stories/base-field-mocks";
import {BaseCheckbox} from "@core/components";


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
        hardDisable: false,
    },
};
// #endregion Default

