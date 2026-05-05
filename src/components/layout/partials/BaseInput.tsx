import {observer} from "mobx-react-lite";
import {Input} from "@core/components/ui/input";
import {Tooltip, TooltipContent, TooltipTrigger} from "@core/components/ui/tooltip";
import {isNullEmptyFalseOrUndefined} from "@core/lib/utils";
import {Info} from "lucide-react";
import {BaseFieldModel} from "@core/models";
import {Footer} from "@core/components/layout/partials/Footer";

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
 * - Possible variants `default`, `ghost`, `outline`, `link`.
 *
 * @see BaseInputProps
 * @see BaseFieldModel
 * @see BaseFieldModel.addit
 */
const BaseInput = observer((props: BaseInputProps) => {
    const {field, handleChange, handleBlur, hardDisable} = props;
    
    const isDisabled = hardDisable || field.isDisabled;

    return (
        <div className="w-full">
            <Header field={field} />
            <div className="flex items-center gap-2">
                <Input
                    className={field.style}
                    disabled={isDisabled}
                    type="text"
                    value={field.value ?? ""}
                    placeholder={field.addit!.placeholder ?? ""}
                    onChange={e => handleChange(field.id, e.target.value)}
                    onBlur={() => handleBlur(field.id)}
                />
                <InfoLink field={field} />
            </div>
          <Footer field={field} />
        </div>
    )
});

const Header = observer(({ field }: { field: BaseFieldModel }) => {
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

const InfoLink = observer(({ field }: { field: BaseFieldModel }) => {
    if (field.variant !== "link") return null;
    
    return (
        <Tooltip>
            <TooltipTrigger>
                <label>
                    <Info className="w-5 h-5"/>
                </label>
            </TooltipTrigger>
            <TooltipContent>
                <label>{field.description}</label>
            </TooltipContent>
        </Tooltip>
    );
});

export {BaseInput};