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
 * - This component uses the {@link BaseFieldModel} to control its state, appearance, and behavior.
 * - Input is stored in the `field.value`. The `handleChange` callback is called whenever the checkbox is toggled, and `handleBlur` is called when it loses focus.
 * - If `hardDisable` is set to `true`, the input will be disabled regardless of the field state.
 * - Important this field can use additional parameter placeholder to declare input placeholder!
 * - Possible variants `default`, `ghost`
 *
 * @see BaseInputProps
 * @see BaseFieldModel
 * @see BaseFieldModel.addit
 */

const BaseInput: React.FC<BaseInputProps> = observer((props) => {
    const {field, handleChange, handleBlur, hardDisable} = props;

    const isDisabled = hardDisable || field.isDisabled;

    // #region Variants
    const isGhost = field.variant === "ghost";
    const isPrimary = field.variant === "default" || field.variant === "secondary";
    // #endregion Variants

    return (
        <div>
            {!isGhost &&
                <label className="text-sm font-medium block mb-2 p-1">
                    <>{field.label}</>
                </label>
            }
            <Input
                className={field.style}
                disabled={isDisabled}
                type="text"
                value={field.value}
                placeholder={field.addit!.placeholder ?? ""}
                onChange={e => handleChange(field.id, e.target.value)}
                onBlur={() => handleBlur(field.id)}
            />
            {isPrimary && (
                <p className="text-sm text-gray-400 font-light whitespace-normal break-word p-1">
                    {field.description}
                </p>
            )}
        </div>
    )
});

export default BaseInput;