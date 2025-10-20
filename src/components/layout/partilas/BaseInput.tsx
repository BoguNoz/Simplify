import BaseFieldModel from "@core/models/base-field-model";
import {observer} from "mobx-react-lite";
import React from "react";
import {Input} from "@core/components/ui/input";

interface BaseInputProps {
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
 * Input is assigned to `field.value`. The `handleChange` callback is called
 * whenever the checkbox is toggled, and `handleBlur` is called when it loses focus.
 * 
 * If `hardDisable` is set to `true`, the input will be disabled regardless of the field state.
 * 
 *
 *
 * @see BaseFieldModel
 */

const BaseInput: React.FC<BaseInputProps> = observer((props) => {
    const {field, handleChange, handleBlur, hardDisable} = props;

    const isDisabled = hardDisable || field.isDisabled;

    return (
        <div>
            <Input
                className={field.style}
                disabled={isDisabled}
                type="text"
                value={field.value}
                placeholder={field.addit!.placeholder ?? ""}
                onChange={e => handleChange(field.id, e.target.value)}
                onBlur={() => handleBlur(field.id)}
            />
        </div>
    )
});

export default BaseInput;