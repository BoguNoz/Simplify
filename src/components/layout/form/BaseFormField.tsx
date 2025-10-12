import React from "react";
import { observer } from "mobx-react-lite";
import BaseAlertWrapper from "@core/components/layout/form/wrappers/BaseAlertWrapper.tsx";
import BaseFieldTypeEnum from "../../../enums/base-field-type-enum.ts";
import BaseSingleChoiceFormField from "@core/components/layout/form/BaseSingleChoiceFormField.tsx";
import BaseInputFormField from "@core/components/layout/form/BaseInputFormField.tsx";
import BaseButtonFormField from "@core/components/layout/form/BaseButtonFormField.tsx";
import {BaseStore} from "../../../stores/base-store.ts";

interface BaseFormFieldProps {
    fieldId: string;
    store: BaseStore;

    handleBlur: (fieldId: string) => void;
    handleChange: (fieldId: string, value: any) => void;
}

const BaseFormField: React.FC<BaseFormFieldProps> = observer(({ fieldId, store, handleBlur, handleChange }) => {
    const field = store.fields[fieldId];
    if (!field || !field.render) return null;

    const validationResult = store.validateField(fieldId);
    const dependencies = field.dependencies.map(dep => {
        const field = store.fields[dep.fieldId];
        return field.label;
    })

    const isValid = validationResult.every(r => r.isValid);

    if ( field.addit!.isButtonField ) {
        return (
            <div className="m-5">
                <BaseButtonFormField
                    field={field}
                    value={field.value}
                    handleChange={handleChange}
                    handleBlur={handleBlur}
                />
            </div>
        )
    }

    return (
        <div className="p-2">
            <BaseAlertWrapper
                field={field}

                isValid={isValid}
                validationResult={validationResult}
                dependencies={dependencies}
            >
                {
                    field.fieldType === BaseFieldTypeEnum.Switch ||
                    field.fieldType === BaseFieldTypeEnum.CheckBox ? (
                        <BaseSingleChoiceFormField
                            field={field}
                            value={field.value}
                            handleChange={handleChange}
                            handleBlur={handleBlur}
                        />
                    ) : (
                        <BaseInputFormField
                            field={field}
                            value={field.value}
                            handleChange={handleChange}
                            handleBlur={handleBlur}
                            isValid={isValid}
                        />
                    )
                }
            </BaseAlertWrapper>
        </div>
    );
});

export default BaseFormField;
