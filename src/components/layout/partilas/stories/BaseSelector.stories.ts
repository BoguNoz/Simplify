import type { Meta, StoryObj } from "@storybook/react";
import {mockBaseRegisteredFields, mockFields} from "@core/components/stories/base-field-mocks";
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
        hardDisable: false,
    },
};
// #endregion Default

