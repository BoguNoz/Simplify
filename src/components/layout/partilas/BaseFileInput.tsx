import BaseFieldModel from "@core/models/base-field-model";
import {observer} from "mobx-react-lite";
import React from "react";
import {Input} from "@core/components/ui/input";
import {Toggle} from "@core/components/ui/toggle";
import {Tooltip, TooltipContent, TooltipTrigger} from "@core/components/ui/tooltip";
import {isNullEmptyFalseOrUndefined} from "@core/lib/utils";
import {Info} from "lucide-react";

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
 * - Possible variants `default`, `ghost`, `outline`, `link`.
 *
 * @see BaseFieldModel
 * @see BaseFileInputProps
 */

const BaseFileInput: React.FC<BaseFileInputProps> = observer((props) => {
    const {field, handleChange, hardDisable} = props;

    const isDisabled = hardDisable || field.isDisabled;

    return (
        <div className="p-3">
            <BaseFileInputHeader field={field} />
            <div className="flex items-center gap-2">
                <Input
                    className={field.style}
                    disabled={isDisabled}
                    type="file"
                    onChange={e => handleChange(field.id, e.target.files?.[0] ?? "")}
                />
                <BaseFileInputLink field={field} />
            </div>
            <BaseFileInputFooter field={field} />
        </div>
    )
});

const BaseFileInputHeader = observer(({ field }: { field: BaseFieldModel }) => {

    const isGhost = field.variant === "ghost";
    const isOutline = field.variant === "outline";
    const isLink = field.variant === "link";

    if (isGhost || isLink) return null;

    const labelStyles = isOutline ?
        "text-sm font-medium block mb-1 ml-1 p-1" :
        "text-sm font-medium block mb-2 p-1"

    return (
        <Tooltip>
            <TooltipTrigger>
                <label className={labelStyles}>
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
    );
});

const BaseFileInputLink = observer(({ field }: { field: BaseFieldModel }) => {
    if (field.variant !== "link") return null;

    return (
        <Tooltip>
            <TooltipTrigger>
                <label>
                    <Info className="w-5 h-5 mt-2"/>
                </label>
            </TooltipTrigger>
            <TooltipContent>
                <label>{field.description}</label>
            </TooltipContent>
        </Tooltip>
    );
});

const BaseFileInputFooter = observer(({ field }: { field: BaseFieldModel }) => {
    if (field.variant !== "default" && field.variant !== "secondary") return null;

    return (
        <p className="text-sm text-gray-400 font-light whitespace-normal break-word p-1">
            {field.description}
        </p>
    );
});

export default BaseFileInput;