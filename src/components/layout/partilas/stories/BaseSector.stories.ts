import type { Meta, StoryObj } from "@storybook/react";
import {action} from "storybook/actions";
import {mockBaseRegisteredFields, mockFields} from "@core/components/mocks/base-field-mocks";
import BaseSelector from "@core/components/layout/partilas/BaseSelector";


const meta: Meta<typeof BaseSelector> = {
    title: "partials/BaseSelector",
    component: BaseSelector,
    parameters: {
        layout: "centered",
    },
};
export default meta;

type Story = StoryObj<typeof BaseSelector>;

const field = mockFields.find(bf => bf.id === mockBaseRegisteredFields.baseSelector)!;

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

