import {useCallback} from "react";
import { observer } from "mobx-react-lite";
import {BaseStore} from "@core/stores/base-store";
import BaseFieldTypeEnum from "@core/models/enums/base-field-type-enum";
import {Alert, AlertDescription, AlertTitle} from "@core/components/ui/alert";
import BaseField from "@core/components/layout/BaseField";
import {AlertCircle, AlertTriangle, CheckCircle, CircleOff, Link} from "lucide-react";
import {Collapsible, CollapsibleContent, CollapsibleTrigger} from "@core/components/ui/collapsible";
import BaseFieldModel from "@core/models/base-field-model";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCircleXmark} from "@fortawesome/free-regular-svg-icons";
import {faTriangleExclamation} from "@fortawesome/free-solid-svg-icons";
import {BaseFieldInterface} from "@core/models/base-field-interface";
import {useMetadata} from "@core/engine/components/metadata-context";
import MetadataModel from "@core/models/metadata-model";

/**
 * A form wrapper for the polymorphic field component {@link BaseField},
 * which overlays validation messages and state for the field.
 * 
 * @remarks
 * - Possible variants `default`, `secondary`, `ghost`, `outline`.
 * - This component supports all base field types defined in {@link BaseFieldTypesEnum}.
 * - The `hardDisable` prop allows external forcing of the disabled state, overriding the field's own state.
 * - The `hardTyping` prop allows overriding the field type for special cases.
 - The `handleBlur` and `handleChange` prop allows overriding default behaviour on field blur and change respectively.
 *
 * @see FormFieldProps
 */
const FormField = observer((props: BaseFieldInterface) => {
    const {fieldId, store, handleChange, handleBlur, hardDisable, hardTyping} = props;

    const metadata = useMetadata() || {} as MetadataModel;

    // #region Actions
    const onChange = useCallback(
        async (fieldId: string, value: any) => {
            if (handleChange) {
                await handleChange(fieldId, value);
            } else {
                await store.setFieldValue(fieldId, value);
                store.validateField(fieldId);
            }
        },
        [handleChange]
    );

    const onBlur = useCallback(
        async (fieldId: string) => {
            if (handleBlur) {
                await handleBlur(fieldId);
            } else {
                store.validateField(fieldId);
            }
        },
        [handleBlur]
    );
    // #endregion Actions

    const field = store.fields[fieldId];
    if (!field || !field.render) {
        return null;
    }

    const isValid = field.state.status === "valid";
    const isDisabled = field.isDisabled || hardDisable;
    const isWarning = field.state.status === "warning";

    const status = () => {
        if (field.excluded || field.state.status === "unknown") {
            return "default";
        }
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
    // #endregion Variables

    return (
        <div style={{ width: `${metadata.width * 0.93}px` }} className="p-2">
            <Alert
                variant={variant()}
                status={status()}
                className="relative w-full"
            >
                <div className="absolute top-2 right-2">
                   <InfoSymbol field={field} hardDisable={hardDisable} />
                </div>

                <AlertTitle  className="flex flex-col gap-1 w-full">
                    <BaseField
                        fieldId={fieldId}
                        store={store}
                        handleChange={onChange}
                        handleBlur={onBlur}
                        hardDisable={hardDisable}
                        hardTyping={hardTyping}
                    />
                </AlertTitle>
                <AlertDescription>
                    <div className="flex flex-col gap-1">
                       <ValidatorBox field={field}/>
                       <Dependencies field={field} store={store} />
                    </div>
                </AlertDescription>
            </Alert>
        </div>
    );
});

const InfoSymbol = observer(({ field, hardDisable }: { field: BaseFieldModel, hardDisable?: boolean}) => {
    const fieldStatus = field.state.status;

    if (field.variant === "ghost" || field.excluded) {
        return <></>
    }
    else if (field.isDisabled || hardDisable) {
        return <CircleOff className="w-4 h-4"/>
    }
    else if (fieldStatus === "error") {
        return <AlertCircle className="w-4 h-4"/>
    }
    else if (fieldStatus === "warning") {
        return <AlertTriangle className="w-4 h-4"/>
    }
    else if (field.isRequired) {
        return <CheckCircle className="w-4 h-4"/>;
    }
});

const Dependencies = observer(({ field, store }: { field: BaseFieldModel, store: BaseStore }) => {
    if (!field.isDisabled || field.fieldType === BaseFieldTypeEnum.Button) return null;

    const dependencies = field.dependencies.map(dep => {
        const field = store.fields[dep.fieldId];
        return field.label as string;
    })

    return (
        <Collapsible>
            <CollapsibleTrigger asChild>
                <div className="flex items-center gap-1 text-gray-700">
                    <Link className="h-4 w-4" />
                </div>
            </CollapsibleTrigger>
            {
                dependencies.map(dep => (
                    <CollapsibleContent key={dep}>
                        <label className="ml-6 mb-1 block">{dep}</label>
                    </CollapsibleContent>
                ))
            }
        </Collapsible>
    );
});

const ValidatorBox = observer(({ field }: { field: BaseFieldModel}) => {
    if (field.isDisabled || field.state.status === "valid") return null;

    const warnings = field.state.validationResult.filter(v => v.isWarning);
    const firstError = field.state.validationResult.find(v => !v.isWarning);

    const combinedResults = firstError ? [firstError] : warnings;

    return (
        <div className="w-full">
            {combinedResults.map((v, index) => (
                <div key={index} className="flex items-center gap-x-2 mb-1">
                    {!v.isWarning ? (
                        <FontAwesomeIcon icon={faCircleXmark} className="text-red-500 align-top" />
                    ) : (
                        <FontAwesomeIcon icon={faTriangleExclamation} className="text-yellow-500" />
                    )}

                    <label className={v.isWarning ? "text-yellow-500" : "text-destructive"}>
                        {v.message}
                    </label>
                </div>
            ))}
        </div>
    );
});

export default FormField;
