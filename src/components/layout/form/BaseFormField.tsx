import React from "react";
import { observer } from "mobx-react-lite";
import BaseAlertWrapper from "@core/components/layout/form/wrappers/BaseAlertWrapper";
import BaseFieldTypeEnum from "@core/enums/base-field-type-enum";
import BaseSingleChoiceFormField from "@core/components/layout/form/partials/BaseSingleChoiceFormField";
import BaseInputFormField from "@core/components/layout/form/partials/BaseInputFormField";
import BaseButtonFormField from "@core/components/layout/form/partials/BaseButtonFormField";
import {BaseStore} from "@core/stores/base-store";

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
                            handleChange={handleChange}
                            handleBlur={handleBlur}
                        />
                    ) : (
                        <BaseInputFormField
                            field={field}
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
