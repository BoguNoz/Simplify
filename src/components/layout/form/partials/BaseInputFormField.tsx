import React from "react";
import { observer } from "mobx-react-lite";
import BaseFieldModel from "@core/models/base-field-model";
import BaseField from "../../BaseField";

interface BaseInputFormFieldProps {
    field: BaseFieldModel
    isValid: boolean;
    hardDisable?: boolean;

    handleBlur: (fieldId: string) => void;
    handleChange: (fieldId: string, value: any) => void;
}

const BaseInputFormField: React.FC<BaseInputFormFieldProps> = observer(({ field, handleChange, handleBlur, isValid, hardDisable }) => {
    return (
        <div>
            {field.addit!.isLabelActive &&
                <label className="text-sm font-medium block mb-2 p-1">{field.label}</label>
            }
            <BaseField
                field={field}
                handleChange={handleChange}
                handleBlur={handleBlur}
                hardDisable={hardDisable}
            />
            {isValid && (
                <p className="text-sm text-gray-400 font-light whitespace-normal break-word p-1">
                    {field.description}
                </p>
            )}
        </div>
    );
});


export default BaseInputFormField;
