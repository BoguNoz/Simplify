import BaseFieldModel from "@core/models/base-field-model";
import {observer} from "mobx-react-lite";
import {Checkbox} from "@core/components/ui/checkbox";
import React from "react";

interface BaseCheckboxProps {
    field: BaseFieldModel;

    handleChange: (fieldId: string, value: any) => void;
    handleBlur: (fieldId: string) => void;

    hardDisable?: boolean;
}

/**
 * A base checkbox component integrated with the reactive field model.
 *
 * @remarks
 * This component uses the {@link BaseFieldModel} to control its state, appearance, and behavior.
 * 
 * The checkbox state is synced with `field.value`. The `handleChange` callback is called
 * whenever the checkbox is toggled, and `handleBlur` is called when it loses focus.
 * 
 * If `hardDisable` is set to `true`, the checkbox will be disabled regardless of the field state.
 *
 * @see BaseFieldModel
 * @see BaseCheckboxProps
 */
const BaseCheckbox = observer((props: BaseCheckboxProps) => {
    const {field, handleChange, handleBlur, hardDisable} = props;

    const isDisabled = hardDisable || field.isDisabled;

    return (
        <div className="flex items-center justify-between">
            <Checkbox
                className={field.style}
                disabled={isDisabled}
                checked={field.value}
                onCheckedChange={c => handleChange(field.id, c)}
                onBlur={() => handleBlur(field.id)}
            />
        </div>
    )
});

export default BaseCheckbox;