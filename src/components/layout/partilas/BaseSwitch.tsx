import BaseFieldModel from "@core/models/base-field-model";
import {observer} from "mobx-react-lite";
import React from "react";
import {Switch} from "@core/components/ui/switch";

// TODO Documentation

interface BaseSwitchProps {
    field: BaseFieldModel;

    handleChange: (fieldId: string, value: any) => void;
    handleBlur: (fieldId: string) => void;

    hardDisable?: boolean;
}

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