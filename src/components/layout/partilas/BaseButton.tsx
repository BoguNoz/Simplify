import BaseFieldModel from "@core/models/base-field-model";
import {observer} from "mobx-react-lite";
import {Spinner} from "@core/components/ui/spiner";
import {IconExclamationCircle} from "@tabler/icons-react";
import {Button} from "@core/components/ui/button";
import React from "react";
import {isNullOrUndefined} from "@core/lib/utils";

interface BaseButtonProps {
    field: BaseFieldModel;

    handleChange: (fieldId: string, value: any) => void;
    handleBlur: (fieldId: string) => void;

    hardDisable?: boolean;
}

/**
 * Base button component integrated with the reactive field model.
 *
 * @remarks
 * This button uses {@link BaseFieldModel} to control its state, appearance, and behavior.
 * The component also displays a spinner during processing and an error icon when the field is in an error state.
 * 
 * If `hardDisable` is set to `true`, the button will be disabled regardless of the field state.
 *
 * Possible variants `default`, `outline`, `ghost`, `destructive`, `secondary`, `link`
 *
 * @see BaseFieldModel
 * @see BaseButtonProps
 */
const BaseButton: React.FC<BaseButtonProps> = observer((props) => {
    const {field, handleChange, handleBlur, hardDisable} = props;

    const isDisabled = hardDisable || field.isDisabled;
    const isIcon = typeof field.label !== "string";

    return (
        <div className="flex justify-end">
            <Spinner
                className={"mr-1 " + (field.style || "text-gray-300")}
                show={field.state.processing || false}
                size="small"
            />
            {field.state.error && (
                <IconExclamationCircle className="text-destructive w-[20px] h-[20px] mr-2 mt-2 font-light" />
            )}
            <Button
                className={field.style}
                size={isIcon ? "icon" : "default"}
                disabled={isDisabled}
                variant={field.variant}
                onClick={c => handleChange(field.id, c)}
                onBlur={() => handleBlur(field.id)}
            >
                <>{isIcon ? <field.label /> : field.label}</>
            </Button>
        </div>
    )
});

export default BaseButton;