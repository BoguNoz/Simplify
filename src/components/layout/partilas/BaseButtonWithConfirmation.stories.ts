import type { Meta, StoryObj } from "@storybook/react";
import BaseButtonWithConfirmation from "@core/components/layout/partilas/BaseButtonWithConfirmation";
import { buildFields, createFieldPlaceholders } from "@core/models/utils/base-model-utils";
import BaseFieldTypesEnum from "@core/enums/base-field-type-enum";
import {action} from "storybook/actions";

// #region Mock
const mockFields = {
    mockButtonWithConfirm: "mockButtonWithConfirm"
}

const fields = createFieldPlaceholders(mockFields, {});

fields.mockButtonWithConfirm.fieldType = BaseFieldTypesEnum.ButtonWithConfirmation;
fields.mockButtonWithConfirm.variant = "outline"
fields.mockButtonWithConfirm.label = "Delete item";
fields.mockButtonWithConfirm.description = "Deletes a record";
fields.mockButtonWithConfirm.addit!.timeout = 1000;
fields.mockButtonWithConfirm.addit!.infoDescription = "Are you absolutely sure?";
fields.mockButtonWithConfirm.addit!.confirmButtonLabel = "Yes";
fields.mockButtonWithConfirm.addit!.declineButtonLabel = "No";
fields.mockButtonWithConfirm.addit!.handleConfirm = action("onConfirm");

const mockedFields = buildFields(fields);
console.log(mockedFields);
// #endregion Mock

const meta: Meta<typeof BaseButtonWithConfirmation> = {
    title: "partials/BaseButtonWithConfirmation",
    component: BaseButtonWithConfirmation,
    parameters: {
        layout: "centered",
        docs: {
            description: {
                component:
                    `A reusable button that requires user confirmation before executing an action.
                    Displays a confirmation dialog inline instead of immediately performing the action.`,
            },
        },
    },
    tags: ["autodocs"],
};
export default meta;

type Story = StoryObj<typeof BaseButtonWithConfirmation>;

// Default state
export const Default: Story = {
    args: {
        field: mockedFields[0],
        handleChange: action("handleChange"),
        handleBlur: action("handleBlur"),
        hardDisable: false,
    },
};

// Disabled button
export const Disabled: Story = {
    args: {
        ...Default.args,
        hardDisable: true,
    },
};
