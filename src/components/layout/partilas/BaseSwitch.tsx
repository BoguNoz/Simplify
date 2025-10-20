import BaseFieldModel from "@core/models/base-field-model";
import {observer} from "mobx-react-lite";
import React from "react";
import {Switch} from "@core/components/ui/switch";

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
 * This component uses the {@link BaseFieldModel} to control its state, appearance, and behavior.
 * 
 * The switch state is synced with `field.value`. The `handleChange` callback is called
 * whenever the toggle is toggled, and `handleBlur` is called when it loses focus.
 *
 *
 * @see BaseFieldModel
 * @see BaseSwitchProps
 */
const BaseSwitch: React.FC<BaseSwitchProps> = observer((props) => {
    const {field, handleChange, handleBlur, hardDisable} = props;

    const isDisabled = hardDisable || field.isDisabled;

    return (
        <div className={field.style}>
            <Switch
                className={field.style}
                disabled={isDisabled}
                checked={field.value}
                onCheckedChange={c => handleChange(field.id, c)}
                onBlur={() => handleBlur(field.id)}
            />
        </div>
    )
});

export default  BaseSwitch;