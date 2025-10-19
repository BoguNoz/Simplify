import React, {ReactNode, useMemo} from "react";
import {Alert, AlertDescription, AlertTitle} from "@core/components/ui/alert";
import {
    AlertCircle,
    AlertTriangle,
    CheckCircle,
    CircleOff,
    Link,
} from "lucide-react";
import {ValidatorResponse} from "@core/events/validator";
import BaseValidatorBox from "./BaseValidatorBox";
import {Collapsible, CollapsibleContent, CollapsibleTrigger} from "@core/components/ui/collapsible";
import {Button} from "@core/components/ui/button";
import {isNullEmptyFalseOrUndefined} from "@core/lib/utils";
import {observer} from "mobx-react-lite";
import BaseFieldModel from "@core/models/base-field-model";
import BaseFieldTypeEnum from "@core/enums/base-field-type-enum";

interface BaseAlertWrapperProps {
    field: BaseFieldModel;
    children: ReactNode;

    isValid: boolean;
    validationResult: ValidatorResponse[];
    dependencies: string[];

    dependenciesLabel?: string;
}


const BaseAlertWrapper: React.FC<BaseAlertWrapperProps> = observer(({field, children, isValid, validationResult, dependencies, dependenciesLabel}) => {


    // #region BaseVariables
    const isSuccess = isValid && !isNullEmptyFalseOrUndefined(field.value);;
    const isWarning = !isValid && validationResult.every(r => r.isWarning);
    const errorMessages = validationResult.map(validationResult => validationResult.message);
    // #endregion BaseVariables

    // #region MemoVariables
    const dependenciesLabelFinal = useMemo(() => dependenciesLabel ?? "Dependencies", [dependenciesLabel]);

    const variant = useMemo(() => {
        const borderless = field.addit?.isBorderless;

        if (field.isDisabled) return borderless ? "softDisabled" : "disabled";
        if (isValid) return isSuccess ? (borderless ? "softSuccess" : "success") : "default";
        if (isWarning) return borderless ? "softWarning" : "warning";
        return borderless ? "softDestructive" : "destructive";

    } ,[field, isValid, isWarning, isSuccess]);

    const bordered = useMemo(() => !field.addit!.isBorderless, [field])

    const dependenciesFields = useMemo(() => (
        dependencies.map(dep => (
            <CollapsibleContent key={dep}>
                <label className="ml-6 mb-1 block">{dep}</label>
            </CollapsibleContent>
        ))
    ), [dependencies]);
    // #endregion MemoVariables

    // #region NonStaticVariables
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

    const isDependenciesSectionVisible = field.isDisabled && field.fieldType != BaseFieldTypeEnum.Button;
    // #rendegion NonStaticVariables

    return (
        <Alert
            variant={variant}
            bordered={bordered}
            className={field.style}
        >
            {getSymbol()}
            <AlertTitle  className="flex flex-col gap-1 w-full">
                {children}
            </AlertTitle>
            <AlertDescription className="font-light p-1">
                <div className="flex flex-col gap-1">
                    {
                        (!errorMessages || field.isDisabled) ? null :
                            (isValid || isSuccess) ? <label></label> :
                                <BaseValidatorBox
                                    validationResult={validationResult}
                                />
                    }
                    { isDependenciesSectionVisible && (
                        <Collapsible>
                            <CollapsibleTrigger asChild>
                                <div className="flex items-center gap-1 text-gray-700">
                                    <Button className="text-gray-900 font-light" variant="link">
                                        {dependenciesLabelFinal}
                                    </Button>
                                    <Link className="h-4 w-4" />
                                </div>
                            </CollapsibleTrigger>
                            {dependenciesFields}
                        </Collapsible>
                    )}
                </div>
            </AlertDescription>
        </Alert>
    );
});

export default BaseAlertWrapper;