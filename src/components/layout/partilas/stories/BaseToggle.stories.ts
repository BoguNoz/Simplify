import type { Meta, StoryObj } from "@storybook/react";
import {action} from "storybook/actions";
import {
    mockBaseRegisteredFields,
    mockFields,
} from "@core/components/stories/base-field-mocks";
import BaseToggle from "@core/components/layout/partilas/BaseToggle";


const meta: Meta<typeof BaseToggle> = {
    title: "partials/BaseToggle",
    component: BaseToggle,
    parameters: {
        layout: "centered",
    },
};
export default meta;

type Story = StoryObj<typeof BaseToggle>;

const field = mockFields.find(bf => bf.id === mockBaseRegisteredFields.baseToggle)!;

// #region Default
export const Default: Story = {
    args: {
        field: field,
        hardDisable: false,
    },
};
// #endregion Default

