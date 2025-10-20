import BaseFieldModel from "@core/models/base-field-model";
import FormFieldTypesEnum from "@core/enums/base-field-type-enum";
import React from "react";
import BaseSelector from "@core/components/layout/partilas/BaseSelector";
import BaseFieldTypeEnum from "@core/enums/base-field-type-enum";
import {observer} from "mobx-react-lite";
import BaseButtonWithConfirmation from "@core/components/layout/partilas/BaseButtonWithConfirmation";
import {BaseButton} from "@core/components/layout/partilas/BaseButton";
import BaseToggle from "@core/components/layout/partilas/BaseToggle";
import BaseCheckbox from "@core/components/layout/partilas/BaseCheckbox";
import BaseFileInput from "@core/components/layout/partilas/BaseFileInput";
import BaseSwitch from "@core/components/layout/partilas/BaseSwitch";
import BaseInput from "@core/components/layout/partilas/BaseInput";

interface BaseFieldProps {
    field: BaseFieldModel

    handleBlur: (fieldId: string) => void;
    handleChange: (fieldId: string, value: any) => void;

    hardDisable?: boolean;
    hardTyping?: BaseFieldTypeEnum;
}

/**
 * A polymorphic field component that dynamically renders the appropriate input type
 * based on the {@link BaseFieldModel} configuration.
 *
 * @remarks
 * This component supports all base field types defined in {@link FormFieldTypesEnum}.
 *
 * The component automatically passes the reactive field state (`isDisabled`, `value`, `label`, etc.)
 * and invokes the provided `handleChange` and `handleBlur` callbacks.
 *
 * The `hardDisable` prop allows external forcing of the disabled state, overriding the field's own state.
 * The `hardTyping` prop allows overriding the field type for special cases.
 *
 *
 * @see BaseFieldModel
 * @see FormFieldTypesEnum
 * @see BaseFieldProps
 */
const BaseField: React.FC<BaseFieldProps> = observer(({ field, handleChange, handleBlur, hardDisable, hardTyping }) => {
    const isDisable = field.isDisabled || hardDisable;
    const type = hardTyping || field.fieldType

    switch (type) {
        case FormFieldTypesEnum.Input:
            return (
               <BaseInput
                   field={field}
                   handleChange={handleChange}
                   handleBlur={handleBlur}
                   hardDisable={hardDisable}
               />
            );
        case FormFieldTypesEnum.FileInput:
            return (
                <BaseFileInput
                    field={field}
                    handleChange={handleChange}
                    hardDisable={hardDisable}
                />
            );
        case FormFieldTypesEnum.CheckBox:
            return (
               <BaseCheckbox
                   field={field}
                   handleChange={handleChange}
                   handleBlur={handleBlur}
                   hardDisable={hardDisable}
               />
            );
        case FormFieldTypesEnum.Switch:
            return (
                <BaseSwitch
                    field={field}
                    handleChange={handleChange}
                    handleBlur={handleBlur}
                    hardDisable={hardDisable}
                />
            );
        case FormFieldTypesEnum.Select:
            return (
                <BaseSelector
                    field={field}
                    handleChange={e => {handleChange(field.id, e)}}
                    handleBlur={() => handleBlur(field.id)}
                    hardDisable={isDisable}
                />
            );
        case FormFieldTypesEnum.Button:
            return (
                <BaseButton
                    field={field}
                    handleChange={handleChange}
                    handleBlur={handleBlur}
                    hardDisable={hardDisable}
                />
            );
        case FormFieldTypesEnum.ButtonWithConfirmation:
            return (
                <BaseButtonWithConfirmation
                    field={field}
                    handleChange={handleChange}
                    handleBlur={handleBlur}
                    hardDisable={hardDisable}
                />
            );
        case FormFieldTypesEnum.Toggle:
            return (
                <BaseToggle
                  field={field}
                  handleChange={handleChange}
                  hardDisable={hardDisable}
                />
            );
        default:
            return null;
    }
});

export default BaseField;

