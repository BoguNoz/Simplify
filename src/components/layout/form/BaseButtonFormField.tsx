import React from "react";
import { observer } from "mobx-react-lite";
import BaseFieldModel from "../../../models/base-field-model.ts";
import BaseField from "../BaseField.tsx";

interface BaseButtonFormFieldProps {
    field: BaseFieldModel
    value: any;

    handleBlur: (fieldId: string) => void;
    handleChange: (fieldId: string, value: any) => void;
}

const BaseButtonFormField: React.FC<BaseButtonFormFieldProps> = observer(({ field, value, handleBlur, handleChange }) => {
    return (
        <div className="flex items-center gap-2">
            <BaseField
                field={field}
                value={value}
                handleChange={handleChange}
                handleBlur={handleBlur}
            />
            {field.addit!.isLabelActive && <label className="text-black font-medium text-sm p-1 mb-1 block">{field.label}</label>}
        </div>
    );
});

export default BaseButtonFormField;
