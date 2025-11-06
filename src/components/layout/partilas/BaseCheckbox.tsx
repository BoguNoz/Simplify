import BaseFieldModel from "@core/models/base-field-model";
import {observer} from "mobx-react-lite";
import {Checkbox} from "@core/components/ui/checkbox";
import React from "react";
import {Tooltip, TooltipContent, TooltipTrigger} from "@core/components/ui/tooltip";
import {isNullEmptyFalseOrUndefined} from "@core/lib/utils";

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
 * - This component uses the {@link BaseFieldModel} to control its state, appearance, and behavior.
 * - The checkbox state is synced with `field.value`. The `handleChange` callback is called whenever the checkbox is toggled, and `handleBlur` is called when it loses focus.
 * - If `hardDisable` is set to `true`, the checkbox will be disabled regardless of the field state.
 * - Possible variants `default`, `ghost`, `outline`.
 *
 * @see BaseFieldModel
 * @see BaseCheckboxProps
 */
const BaseCheckbox = observer((props: BaseCheckboxProps) => {
    const {field, handleChange, handleBlur, hardDisable} = props;

    const isDisabled = hardDisable || field.isDisabled;

    return (
        <div className="flex items-center justify-between p-3">
            <Header field={field} />
            <div className="mr-3">
                <Checkbox
                    className={field.style}
                    disabled={isDisabled}
                    checked={field.value}
                    onCheckedChange={c => handleChange(field.id, c)}
                    onBlur={() => handleBlur(field.id)}
                />
            </div>
            <Footer field={field} />
        </div>
    )
});

const Header = observer(({ field }: { field: BaseFieldModel }) => {
    if (field.variant !== "default" && field.variant !== "secondary") return null;

    return (
        <div className="space-y-0.5 min-w-0">
            <label className="text-sm font-medium leading-none">
                <>{field.label}</>
            </label>
            <p className="text-sm text-gray-400 font-light whitespace-normal break-words mr-10 block">
                {field.description}
            </p>
        </div>
    );
});

const Footer = observer(({ field }: { field: BaseFieldModel }) => {
    if (field.variant !== "outline") return null;

    return (
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
    );
});

export default BaseCheckbox;