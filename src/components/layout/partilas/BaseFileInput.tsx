import BaseFieldModel from "@core/models/base-field-model";
import {observer} from "mobx-react-lite";
import React from "react";
import {Input} from "@core/components/ui/input";
import {Toggle} from "@core/components/ui/toggle";
import {Tooltip, TooltipContent, TooltipTrigger} from "@core/components/ui/tooltip";
import {isNullEmptyFalseOrUndefined} from "@core/lib/utils";

interface BaseFileInputProps {
    field: BaseFieldModel;

    handleChange: (fieldId: string, value: any) => void;

    hardDisable?: boolean;
}

/**
 * A base file input component integrated with the reactive field model.
 *
 * @remarks
 * - This component uses the {@link BaseFieldModel} to control its state, appearance, and behavior.
 * - The selected file is stored in the `field.value`. The `handleChange` callback is called whenever the checkbox is toggled. 
 * - If `hardDisable` is set to `true`, the file input will be disabled regardless of the field state.
 * - Possible variants `default`, `ghost`, `outline`.
 *
 * @see BaseFieldModel
 * @see BaseFileInputProps
 */

const BaseFileInput: React.FC<BaseFileInputProps> = observer((props) => {
    const {field, handleChange, hardDisable} = props;

    const isDisabled = hardDisable || field.isDisabled;

    // #region Variants
    const isGhost = field.variant === "ghost";
    const isPrimary = field.variant === "default" || field.variant === "secondary";
    const isOutline = field.variant === "outline";
    // #endregion Variants

    return (
        <div className="p-3">
            {!isGhost &&
                <Tooltip>
                    <TooltipTrigger>
                        <label className="text-sm font-medium block mb-2 p-1">
                            <>{field.label}</>
                        </label>
                    </TooltipTrigger>
                    {!isNullEmptyFalseOrUndefined(field.description) &&
                        isOutline && (
                        <TooltipContent>
                            <label>{field.description}</label>
                        </TooltipContent>
                    )}
                </Tooltip>
            }
            <Input
                className={field.style}
                disabled={isDisabled}
                type="file"
                onChange={e => handleChange(field.id, e.target.files?.[0] ?? "")}
            />
            {isPrimary && (
                <p className="text-sm text-gray-400 font-light whitespace-normal break-word p-1">
                    {field.description}
                </p>
            )}
        </div>
    )
});

export default BaseFileInput;