import BaseFieldModel from "@core/models/base-field-model";
import {observer} from "mobx-react-lite";
import React from "react";
import {Toggle} from "@core/components/ui/toggle";


interface BaseToggleProps {
    field: BaseFieldModel;

    handleChange: (fieldId: string, value: any) => void;

    hardDisable?: boolean;
}

/**
 * A base toggle component integrated with the reactive field model.
 *
 * @remarks
 * This component uses the {@link BaseFieldModel} to control its state, appearance, and behavior.
 * 
 * The toggle state is synced with `field.value`. The `handleChange` callback is called
 * whenever the toggle is toggled, and `handleBlur` is called when it loses focus.
 *
 *
 * @see BaseFieldModel
 * @see BaseToggleProps
 */
const BaseToggle: React.FC<BaseToggleProps> = observer((props) => {
    const {field, handleChange, hardDisable} = props;

    const isDisabled = hardDisable || field.isDisabled;

    return (
        <div className="p-1">
            <Toggle
                pressed={!!field.value}
                size="sm"
                disabled={isDisabled}
                onChange={e => handleChange(field.id, e)}
                onPressedChange={(pressed) => handleChange(field.id, pressed)}
            >
                <label className="font-light">{field.label}</label>
            </Toggle>
        </div>
    )
});

export default  BaseToggle;