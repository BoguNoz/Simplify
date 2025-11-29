import BaseFieldTypesEnum from "@core/enums/base-field-type-enum";
import React, {useCallback} from "react";
import BaseSelector from "@core/components/layout/partilas/BaseSelector";
import BaseFieldTypeEnum from "@core/enums/base-field-type-enum";
import {observer} from "mobx-react-lite";
import BaseButtonWithConfirmation from "@core/components/layout/partilas/BaseButtonWithConfirmation";
import BaseToggle from "@core/components/layout/partilas/BaseToggle";
import BaseCheckbox from "@core/components/layout/partilas/BaseCheckbox";
import BaseFileInput from "@core/components/layout/partilas/BaseFileInput";
import BaseSwitch from "@core/components/layout/partilas/BaseSwitch";
import BaseInput from "@core/components/layout/partilas/BaseInput";
import BaseButton from "@core/components/layout/partilas/BaseButton";
import {BaseStore} from "@core/stores/base-store";

interface BaseFieldProps {
    fieldId: string;
    store: BaseStore;

    handleBlur?: (fieldId: string) => void;
    handleChange?: (fieldId: string, value: any) => void;

    hardDisable?: boolean;
    hardTyping?: BaseFieldTypeEnum;
}

/**
 * A polymorphic field component that dynamically renders the appropriate input type
 * based on the {@link BaseFieldModel} configuration.
 *
 * @remarks
 * - This component supports all base field types defined in {@link BaseFieldTypesEnum}.
 * - The `hardDisable` prop allows external forcing of the disabled state, overriding the field's own state.
 * - The `hardTyping` prop allows overriding the field type for special cases.
 * - The `handleBlur` and `handleChange` prop allows overriding default behaviour on field blur and change respectively.
 *
 * @see BaseFieldProps
 * @see BaseButton
 * @see BaseButtonWithConfirmation
 * @see BaseCheckbox
 * @see BaseFileInput
 * @see BaseInput
 * @see BaseSelector
 * @see BaseSwitch
 * @see BaseToggle
 */
const BaseField = observer((props: BaseFieldProps) => {
    const {fieldId, store, handleChange, handleBlur, hardDisable, hardTyping} = props;

    const field = store.fields[fieldId];
    if (!field) {
        return null;
    }

    // #region Actions
    const onChange = useCallback(
        async (fieldId: string, value: any) => {
            if (handleChange) {
                await handleChange(fieldId, value);
            } else {
                await store.setFieldValue(fieldId, value);
            }
        },
        [handleChange]
    );

    const onBlur = useCallback(
        async (fieldId: string) => {
            if (handleBlur) {
                await handleBlur(fieldId);
            }
        },
        [handleBlur]
    );
    // #endregion Actions

    const isDisable = field.isDisabled || hardDisable;
    const type = hardTyping || field.fieldType

    switch (type) {
        case BaseFieldTypesEnum.Input:
            return (
               <BaseInput
                   field={field}
                   handleChange={onChange}
                   handleBlur={onBlur}
                   hardDisable={hardDisable}
               />
            );
        case BaseFieldTypesEnum.FileInput:
            return (
                <BaseFileInput
                    field={field}
                    handleChange={onChange}
                    hardDisable={hardDisable}
                />
            );
        case BaseFieldTypesEnum.CheckBox:
            return (
               <BaseCheckbox
                   field={field}
                   handleChange={onChange}
                   handleBlur={onBlur}
                   hardDisable={hardDisable}
               />
            );
        case BaseFieldTypesEnum.Switch:
            return (
                <BaseSwitch
                    field={field}
                    handleChange={onChange}
                    handleBlur={onBlur}
                    hardDisable={hardDisable}
                />
            );
        case BaseFieldTypesEnum.Select:
            return (
                <BaseSelector
                    field={field}
                    handleChange={e => {onChange(field.id, e)}}
                    handleBlur={() => onBlur(field.id)}
                    hardDisable={isDisable}
                />
            );
        case BaseFieldTypesEnum.Button:
            return (
                <BaseButton
                    field={field}
                    handleChange={onChange}
                    handleBlur={onBlur}
                    hardDisable={hardDisable}
                />
            );
        case BaseFieldTypesEnum.ButtonWithConfirmation:
            return (
                <BaseButtonWithConfirmation
                    field={field}
                    handleChange={onChange}
                    handleBlur={onBlur}
                    hardDisable={hardDisable}
                />
            );
        case BaseFieldTypesEnum.Toggle:
            return (
                <BaseToggle
                  field={field}
                  handleChange={onChange}
                  hardDisable={hardDisable}
                />
            );
        default:
            return null;
    }
});

export default BaseField;

