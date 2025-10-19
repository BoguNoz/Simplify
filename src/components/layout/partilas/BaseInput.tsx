import BaseFieldModel from "@core/models/base-field-model";
import {observer} from "mobx-react-lite";
import React from "react";
import {Input} from "@core/components/ui/input";

// TODO Documentation

interface BaseInputProps {
    field: BaseFieldModel;

    handleChange: (fieldId: string, value: any) => void;
    handleBlur: (fieldId: string) => void;

    hardDisable?: boolean;
}

const BaseInput: React.FC<BaseInputProps> = observer((props) => {
    const {field, handleChange, handleBlur, hardDisable} = props;

    const isDisabled = hardDisable || field.isDisabled;

    return (
        <div>
            <Input
                className={field.style}
                disabled={isDisabled}
                type="text"
                value={field.value}
                placeholder={field.addit!.placeholder ?? ""}
                onChange={e => handleChange(field.id, e.target.value)}
                onBlur={() => handleBlur(field.id)}
            />
        </div>
    )
});

export default BaseInput;