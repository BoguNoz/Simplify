import BaseFieldModel from "@core/models/base-field-model";
import {observer} from "mobx-react-lite";
import React from "react";
import {Toggle} from "@core/components/ui/toggle";

// TODO Documentation

interface BaseToggleProps {
    field: BaseFieldModel;

    handleChange: (fieldId: string, value: any) => void;

    hardDisable?: boolean;
}

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