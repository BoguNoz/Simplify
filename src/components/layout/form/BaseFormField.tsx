import React from "react";
import { observer } from "mobx-react-lite";
import {BaseStore} from "@core/stores/base-store";
import BaseFieldTypeEnum from "@core/enums/base-field-type-enum";
import {Alert, AlertDescription, AlertTitle} from "@core/components/ui/alert";
import {isNullEmptyFalseOrUndefined} from "@core/lib/utils";
import BaseField from "@core/components/layout/BaseField";
import {AlertCircle, AlertTriangle, CheckCircle, CircleOff, Link} from "lucide-react";
import BaseValidatorBox from "@core/components/layout/form/wrappers/BaseValidatorBox";
import {Collapsible, CollapsibleContent, CollapsibleTrigger} from "@core/components/ui/collapsible";
import {Button} from "@core/components/ui/button";

interface BaseFormFieldProps {
    fieldId: string;
    store: BaseStore;

    handleBlur: (fieldId: string) => void;
    handleChange: (fieldId: string, value: any) => void;

    hardDisable?: boolean;
    hardTyping?: BaseFieldTypeEnum;
}

const BaseFormField: React.FC<BaseFormFieldProps> = observer((props) => {
    const {fieldId, store, handleChange, handleBlur, hardDisable, hardTyping} = props;

    const field = store.fields[fieldId];
    if (!field || !field.render) return null;

    // #region Variables
    const validationResult = store.validateField(fieldId);
    const dependencies = field.dependencies.map(dep => {
        const field = store.fields[dep.fieldId];
        return field.label as string;
    })

    const isValid = validationResult.every(r => r.isValid);

    const isSuccess = isValid && !isNullEmptyFalseOrUndefined(field.value);
    const isWarning = !isValid && validationResult.every(r => r.isWarning);
    const isDisabled = field.isDisabled;

    const status = () => {
        if (isSuccess)
            return "success";
        if (isWarning)
            return "warning";
        if (!isValid && !isWarning)
            return "destructive";
        if (isDisabled)
            return "disabled";
        return "default";
    };

    const variant = () => {
        if (field.variant === "default")
            return "primary";
        if (field.variant === "secondary")
            return "secondary";
        if (field.variant === "ghost")
            return "ghost";
        return "ghost";
    };

    const getSymbol = () => {
        if (field.isDisabled && field.fieldType != BaseFieldTypeEnum.Button)
            return <CircleOff/>;
        if (!isValid && !isWarning && !field.isDisabled )
            return <AlertCircle/>;
        if (isValid && field.isRequired && !field.isDisabled)
            return <CheckCircle/>;
        if (!isValid && isWarning && !field.isDisabled)
            return <AlertTriangle/>;
    };

    const dependenciesFields =
        dependencies.map(dep => (
            <CollapsibleContent key={dep}>
                <label className="ml-6 mb-1 block">{dep}</label>
            </CollapsibleContent>
        ));

    const isDependenciesSectionVisible = field.isDisabled && field.fieldType != BaseFieldTypeEnum.Button;
    // #endregion Variables

    return (
        <div className="p-2">
            <Alert
                variant={variant()}
                status={status()}
                className={field.style}
            >
                {getSymbol()}
                <AlertTitle  className="flex flex-col gap-1 w-full">
                    <BaseField
                        field={field}
                        handleChange={handleChange}
                        handleBlur={handleBlur}
                        hardDisable={hardDisable}
                        hardTyping={hardTyping}
                    />
                </AlertTitle>
                <AlertDescription>
                    <div className="flex flex-col gap-1">
                        <BaseValidatorBox
                            validationResult={validationResult}
                        />
                        { isDependenciesSectionVisible && (
                            <Collapsible>
                                <CollapsibleTrigger asChild>
                                    <div className="flex items-center gap-1 text-gray-700">
                                        <Link className="h-4 w-4" />
                                    </div>
                                </CollapsibleTrigger>
                                {dependenciesFields}
                            </Collapsible>
                        )}
                    </div>
                </AlertDescription>
            </Alert>
        </div>
    );
});

export default BaseFormField;
