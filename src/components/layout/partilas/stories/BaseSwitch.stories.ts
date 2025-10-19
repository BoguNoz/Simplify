import type { Meta, StoryObj } from "@storybook/react";
import {action} from "storybook/actions";
import {mockBaseRegisteredFields, mockFields} from "@core/components/mocks/base-field-mocks";
import BaseSwitch from "@core/components/layout/partilas/BaseSwitch";


const meta: Meta<typeof BaseSwitch> = {
    title: "partials/BaseSwitch",
    component: BaseSwitch,
    parameters: {
        layout: "centered",
    },
};
export default meta;

type Story = StoryObj<typeof BaseSwitch>;

const field = mockFields.find(bf => bf.id === mockBaseRegisteredFields.baseSwitch)!;

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

