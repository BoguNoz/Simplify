import BaseFieldModel from "@core/models/base-field-model";
import {observer} from "mobx-react-lite";
import React from "react";
import {Switch} from "@core/components/ui/switch";
import {Tooltip, TooltipContent, TooltipTrigger} from "@core/components/ui/tooltip";
import {isNullEmptyFalseOrUndefined} from "@core/lib/utils";

interface BaseSwitchProps {
    field: BaseFieldModel;

    handleChange: (fieldId: string, value: any) => void;
    handleBlur: (fieldId: string) => void;

    hardDisable?: boolean;
}

/**
 * A base switch component integrated with the reactive field model.
 *
 * @remarks
 * - This component uses the {@link BaseFieldModel} to control its state, appearance, and behavior.
 * - The switch state is synced with `field.value`. The `handleChange` callback is called whenever the toggle is toggled, and `handleBlur` is called when it loses focus.
 * - If `hardDisable` is set to `true`, the select will be disabled regardless of the field state.
 * - Possible variants `default`, `ghost`, `outline`.
 *
 * @see BaseFieldModel
 * @see BaseSwitchProps
 */
const BaseSwitch: React.FC<BaseSwitchProps> = observer((props) => {
    const {field, handleChange, handleBlur, hardDisable} = props;

    const isDisabled = hardDisable || field.isDisabled;

    // #region Variants
    const isPrimary = field.variant === "default" || field.variant === "secondary";
    const isOutline = field.variant === "outline";
    // #endregion Variants

    return (
        <div className="flex items-center justify-between p-3">
            {isPrimary && (
                <div className="space-y-0.5 min-w-0">
                    <label className="text-sm font-medium leading-none">
                        <>{field.label}</>
                    </label>
                    <p className="text-sm text-gray-400 font-light whitespace-normal break-words mr-10 block">
                        {field.description}
                    </p>
                </div>
            )}
            <div className="mr-3 mt-1.5">
                <Switch
                    className={field.style}
                    disabled={isDisabled}
                    checked={field.value}
                    onCheckedChange={c => handleChange(field.id, c)}
                    onBlur={() => handleBlur(field.id)}
                />
            </div>
            {isOutline && (
                <Tooltip>
                    <TooltipTrigger>
                        <label className="font-medium text-sm p-3 block">
                            <>
                                {field.label}
                            </>
                        </label>
                    </TooltipTrigger>
                    {!isNullEmptyFalseOrUndefined(field.description) &&
                        <TooltipContent>
                            <label>{field.description}</label>
                        </TooltipContent>
                    }
                </Tooltip>
            )}
        </div>
    )
});

export default  BaseSwitch;