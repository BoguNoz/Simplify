import type {Meta, StoryObj} from "@storybook/react";
import {action} from "storybook/actions";
import {BaseButton} from "@core/components/layout/partilas/BaseButton";
import {mockBaseRegisteredFields, mockFields} from "@core/components/mocks/base-field-mocks";
import baseField from "@core/components/layout/BaseField";

const meta: Meta<typeof BaseButton> = {
    title: "partials/BaseButton",
    component: BaseButton,
    parameters: {
        layout: "centered",
    },
};
export default meta;

type Story = StoryObj<typeof BaseButton>;

const field = mockFields.find(bf => bf.id === mockBaseRegisteredFields.baseButton)!;

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

// #region Outline
export const Outline: Story = {
    args: {
        ...Default.args,
        field: {
            ...field,
            variant: "outline",
        },
    },
};
// #endregion Outline

// #region Ghost
export const Ghost: Story = {
    args: {
        ...Default.args,
        field: {
            ...field,
            variant: "ghost",
        },
    },
};
// #endregion Ghost

// #region Destructive
export const Destructive: Story = {
    args: {
        ...Default.args,
        field: {
            ...field,
            variant: "destructive",
        },
    },
};
// #endregion Destructive

// #region Secondary
export const Secondary: Story = {
    args: {
        ...Default.args,
        field: {
            ...field,
            variant: "secondary",
        },
    },
};
// #endregion Secondary

// #region Link
export const Link: Story = {
    args: {
        ...Default.args,
        field: {
            ...field,
            variant: "link",
        },
    },
};
// #endregion Link