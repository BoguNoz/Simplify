import BaseFieldModel from "@core/models/base-field-model";
import {observer} from "mobx-react-lite";
import {Checkbox} from "@core/components/ui/checkbox";
import React from "react";

// TODO Documentation

interface BaseCheckboxProps {
    field: BaseFieldModel;

    handleChange: (fieldId: string, value: any) => void;
    handleBlur: (fieldId: string) => void;

    hardDisable?: boolean;
}

const BaseCheckbox = observer((props: BaseCheckboxProps) => {
    const {field, handleChange, handleBlur, hardDisable} = props;

    const isDisabled = hardDisable || field.isDisabled;

    return (
        <div className="flex items-center justify-between">
            <Checkbox
                className={field.style}
                disabled={isDisabled}
                checked={field.value}
                onCheckedChange={c => handleChange(field.id, c)}
                onBlur={() => handleBlur(field.id)}
            />
        </div>
    )
});

export default BaseCheckbox;