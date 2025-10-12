import { observer } from "mobx-react-lite";
import React from "react";
import BaseFieldModel from "../../../models/base-field-model.ts";
import BaseField from "../BaseField.tsx";

interface BaseSingleChoiceFormFieldProps {
    field: BaseFieldModel
    value: any;

    handleBlur: (fieldId: string) => void;
    handleChange: (fieldId: string, value: any) => void;
}

const BaseSingleChoiceFormField: React.FC<BaseSingleChoiceFormFieldProps> = observer(({ field, value, handleBlur, handleChange }) => {
    return (
        <div className="flex items-center justify-between p-3">
            <div className="space-y-0.5 min-w-0">
                <label className="text-sm font-medium leading-none">
                    {field.label}
                </label>
                <p className="text-sm text-gray-400 font-light whitespace-normal break-words mr-10 block">
                    {field.description}
                </p>
            </div>
            <BaseField
                field={field}
                value={value}
                handleChange={handleChange}
                handleBlur={handleBlur}
            />
        </div>
    );
});

export default BaseSingleChoiceFormField;
