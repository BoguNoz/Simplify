import type { Meta, StoryObj } from "@storybook/react";
import {
    mockBaseRegisteredFields,
    mockFields,
} from "@core/components/stories/base-field-mocks";
import { BaseButtonWithConfirmation } from "@core/components";


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
        field: {
            "id": "baseButtonWithConfirm",
            "parentId": "",
            "label": "Base Button with Confirm",
            "description": "A reusable button that requires user confirmation before executing an action. Displays a confirmation dialog inline instead of immediately performing the action.",
            "isDisabled": false,
            "isRequired": false,
            "render": true,
            "excluded": false,
            "fieldType": "buttonWithConfirmation",
            "validators": [],
            "operations": [],
            "addit": {},
            "dependencies": [],
            "style": "",
            "variant": "default",

            "state": {
                "status": "error",
                "validationResult": []
            }
        },
        hardDisable: false,
    },
};
// #endregion Default

