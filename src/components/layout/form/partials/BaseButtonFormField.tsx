import React from "react";
import { observer } from "mobx-react-lite";
import BaseFieldModel from "@core/models/base-field-model";
import BaseField from "../../BaseField";

interface BaseButtonFormFieldProps {
    field: BaseFieldModel

    handleBlur: (fieldId: string) => void;
    handleChange: (fieldId: string, value: any) => void;
}

const BaseButtonFormField: React.FC<BaseButtonFormFieldProps> = observer(({ field, handleBlur, handleChange }) => {
    return (
        <div className="flex items-center gap-2">
            <BaseField
                field={field}
                handleChange={handleChange}
                handleBlur={handleBlur}
            />
            {field.addit!.isLabelActive && <label className="text-black font-medium text-sm p-1 mb-1 block">{field.label}</label>}
        </div>
    );
});

export default BaseButtonFormField;
