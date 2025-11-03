import React from "react";
import { observer } from "mobx-react-lite";
import {BaseStore} from "@core/stores/base-store";
import BaseFieldTypeEnum from "@core/enums/base-field-type-enum";
import {Alert, AlertDescription, AlertTitle} from "@core/components/ui/alert";
import BaseField from "@core/components/layout/BaseField";
import {AlertCircle, AlertTriangle, CheckCircle, CircleOff, Link} from "lucide-react";
import BaseValidatorBox from "@core/components/layout/form/wrappers/BaseValidatorBox";
import {Collapsible, CollapsibleContent, CollapsibleTrigger} from "@core/components/ui/collapsible";
import BaseFieldModel from "@core/models/base-field-model";

interface BaseFormFieldProps {
    fieldId: string;
    store: BaseStore;

    handleBlur: (fieldId: string) => void;
    handleChange: (fieldId: string, value: any) => void;

    hardDisable?: boolean;
    hardTyping?: BaseFieldTypeEnum;
}

/**
 * A form wrapper for the polymorphic field component {@link BaseField},
 * which overlays validation messages and state for the field.
 * 
 * @remarks
 * - Possible variants `default`, `secondary`, `ghost`, `outline`.
 * 
 * @see BaseFormFieldProps
 */
const BaseFormField: React.FC<BaseFormFieldProps> = observer((props) => {
    const {fieldId, store, handleChange, handleBlur, hardDisable, hardTyping} = props;

    const field = store.fields[fieldId];
    if (!field || !field.render) return null;

    // #region Variables
    // TODO Mozna unikną  tego przez zmiane statusu przy walidacji pola.
    const validationResult = store.validateField(fieldId);

    // TODO Do przeniesienia do nowej sekscji
    const dependencies = field.dependencies.map(dep => {
        const field = store.fields[dep.fieldId];
        return field.label as string;
    })

    const isValid = validationResult.every(r => r.isValid);
    const isDisabled = field.isDisabled || hardDisable;
    const isWarning = !isValid && validationResult.every(r => r.isWarning);

    const status = () => {
        if (isDisabled) {
            return "disabled";
        }
        else if (!isValid && !isWarning) {
            return "destructive";
        }
        else if (isWarning) {
            return "warning";
        }
        else if (field.isRequired) {
            return "success";
        }

        return "default";
    };

    const variant = () => {
        if (field.excluded)
            return "ghost";
        if (field.variant === "default")
            return "primary";
        if (field.variant === "secondary" || field.variant === "outline")
            return "secondary";
        if (field.variant === "ghost" || field.variant === "link")
            return "ghost";
        return "ghost";
    };

    const getSymbol = () => {
        if (field.variant === "ghost" || field.excluded) {
            return <></>
        }
        else if (isDisabled) {
            return <CircleOff className="w-4 h-4"/>
        }
        else if (!isValid && !isWarning) {
            return <AlertCircle className="w-4 h-4"/>
        }
        else if (!isValid) {
            return <AlertTriangle className="w-4 h-4"/>
        }
        else if (isValid && field.isRequired) {
            return <CheckCircle className="w-4 h-4"/>;
        }
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
                className="relative"
            >
                <div className="absolute top-2 right-2">
                    {getSymbol()}
                </div>
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
                        {!field.isDisabled && !isValid &&
                            <BaseValidatorBox
                                validationResult={validationResult}
                            />
                        }
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
