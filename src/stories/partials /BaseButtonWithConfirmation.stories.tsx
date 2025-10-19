import type { Meta, StoryObj } from "@storybook/react";
import React from "react";

import type BaseFieldModel from "@core/models/base-field-model";
import BaseButtonWithConfirmation from "@core/components/layout/partilas/BaseButtonWithConfirmation";
import {action} from "storybook/actions";

// Mock dla BaseFieldModel (minimalna implementacja do Storybooka)
const mockField = (overrides?: Partial<BaseFieldModel>): BaseFieldModel => ({
    id: "deleteButton",
    fieldType: "button" as any,
    value: null,
    state: {
        error: false,
        processing: false,
    },
    isDisabled: false,
    isRequired: false,
    render: true,
    label: "Delete item",
    description: "Deletes a record",
    placeholder: "",
    style: "",
    variant: "default",
    validatorsFn: [],
    operations: [],
    dependencies: [],
    dataSource: () => null,
    deconstructor: () => {},
    addit: null,
    ...overrides,
});

// 🧩 Storybook metadata
const meta: Meta<typeof BaseButtonWithConfirmation> = {
    title: "Form/BaseButtonWithConfirmation",
    component: BaseButtonWithConfirmation,
    parameters: {
        layout: "centered",
        docs: {
            description: {
                component: `
A reusable button that requires user confirmation before executing an action.  
Displays a confirmation dialog inline instead of immediately performing the action.`,
            },
        },
    },
    argTypes: {
        timeout: {
            control: "number",
            description: "How long (in ms) before the confirmation resets automatically",
        },
        confirmButtonLabel: {
            control: "text",
            description: "Text for the confirm button",
        },
        declineButtonLabel: {
            control: "text",
            description: "Text for the cancel button",
        },
        infoDescription: {
            control: "text",
            description: "Message shown during confirmation state",
        },
    },
};

export default meta;
type Story = StoryObj<typeof BaseButtonWithConfirmation>;

// ✅ Default state
export const Default: Story = {
    args: {
        field: mockField(),
        infoDescription: "Are you sure you want to delete this record?",
        confirmButtonLabel: "Yes, delete",
        declineButtonLabel: "Cancel",
        handleChange: action("handleChange"),
        handleBlur: action("handleBlur"),
        onConfirm: action("onConfirm"),
    },
};

// 🚫 Disabled button
export const Disabled: Story = {
    args: {
        ...Default.args,
        field: mockField({ isDisabled: true, label: "Disabled action" }),
    },
};

// ⏱ Short timeout example
export const ShortTimeout: Story = {
    args: {
        ...Default.args,
        timeout: 2000,
        infoDescription: "Confirm within 2 seconds!",
    },
};

// 🧾 Custom labels example
export const CustomLabels: Story = {
    args: {
        ...Default.args,
        confirmButtonLabel: "Proceed",
        declineButtonLabel: "Abort",
        field: mockField({ label: "Submit Form" }),
        infoDescription: "Do you really want to submit this form?",
    },
};
