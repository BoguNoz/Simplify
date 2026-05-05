import type { Meta, StoryObj } from "@storybook/react";
import {
    mockBaseRegisteredFields,
    mockFields,
} from "@core/components/stories/base-field-mocks";
import { BaseFileInput } from "@core/components";


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
        hardDisable: false,
    },
};
// #endregion Default

