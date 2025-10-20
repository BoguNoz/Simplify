import BaseFieldModel from "@core/models/base-field-model";
import {observer} from "mobx-react-lite";
import React, {useEffect, useState} from "react";
import {Button} from "@core/components/ui/button";
import {Check, X} from "lucide-react";
import {isNullOrUndefined} from "@core/lib/utils";


interface BaseButtonWithConfirmationProps {
    field: BaseFieldModel;

    handleChange: (fieldId: string, value: any) => void;
    handleBlur: (fieldId: string) => void;

    hardDisable?: boolean;
}

/**
 * Reusable button component that requires user confirmation before executing an action.
 *
 * @remarks
 * This button uses {@link BaseFieldModel} to control its state, appearance, and behavior.
 * The `BaseButtonWithConfirmation` temporarily switches into a confirmation state when clicked.
 * During this state, it displays confirmation and decline buttons instead of the main button label.
 * If the user does not confirm within the given timeout, the button automatically resets.
 *
 * If `hardDisable` is set to `true`, the select will be disabled regardless of the field state.
 *
 * @see BaseFieldModel
 * @see BaseButtonWithConfirmationProps
 */
const BaseButtonWithConfirmation: React.FC<BaseButtonWithConfirmationProps> = observer((props) => {
    const { field, hardDisable, handleChange, handleBlur } = props;

    const [confirming, setConfirming] = useState(false);

    const timer = 5000;
    const isDisabled = hardDisable || field.isDisabled;
    const iconButton = !isNullOrUndefined(field.icon);

    useEffect(() => {
        if (confirming) {
            const timeoutId = setTimeout(() => setConfirming(false), timer);
            return () => clearTimeout(timeoutId);
        }
    }, [confirming, timer]);

    if (!confirming || isDisabled) {
        return (
            <div onClick={() => setConfirming(true)} className="cursor-pointer">
                <Button
                    className={field.style}
                    disabled={isDisabled}
                    variant={field.variant}
                    size={iconButton ? "icon" : "default"}
                    onBlur={() => handleBlur(field.id)}
                >
                    {field.icon ? <field.icon /> : field.label}
                </Button>
            </div>
        );
    }

    if (!isDisabled) {
        return (
            <div>
                <div className="flex gap-2">
                    <Button variant={field.variant} size="icon" onClick={c => handleChange(field.id, c)}>
                        <Check className="text-green-300" />
                    </Button>
                    <Button variant={field.variant} size="icon" onClick={() => setConfirming(false)}>
                        <X className="text-red-300" />
                    </Button>
                </div>
            </div>
        )
    }
});

export default BaseButtonWithConfirmation;