import BaseFieldModel from "@core/models/base-field-model";
import {observer} from "mobx-react-lite";
import React, {useEffect, useMemo, useState} from "react";
import {Button} from "@core/components/ui/button";

/**
 * Props for the {@link BaseButtonWithConfirmation} component.
 *
 * @see BaseButtonWithConfirmationProps.field
 * @see BaseButtonWithConfirmationProps.timeout
 * @see BaseButtonWithConfirmationProps.infoDescription
 * @see BaseButtonWithConfirmationProps.confirmButtonLabel
 * @see BaseButtonWithConfirmationProps.declineButtonLabel
 * @see BaseButtonWithConfirmationProps.handleChange
 * @see BaseButtonWithConfirmationProps.handleBlur
 * @see BaseButtonWithConfirmationProps.onConfirm
 * @see BaseButtonWithConfirmationProps.onConfirm
 */
interface BaseButtonWithConfirmationProps {
    /**
     * Field model that provides field configuration.
     */
    field: BaseFieldModel;

    /**
     * Optional timeout (in milliseconds) before confirmation state resets automatically.
     * Defaults to `5000` ms.
     */
    timeout?: number;
    /**
     * Optional description text displayed during confirmation state.
     */
    infoDescription?: string;

    /**
     * Optional label for the confirmation button.
     * Defaults to `YES`.
     */
    confirmButtonLabel?: string;
    /**
     * Optional Label for the decline (cancel) button.
     * Defaults to `NO`.
     */
    declineButtonLabel?: string;

    /**
     * Triggered when the main button value changes.
     */
    handleChange: (fieldId: string, value: any) => void;
    /**
     * Triggered when the main button loses focus.
     */
    handleBlur: (fieldId: string) => void;
    /**
     * Callback invoked when the confirmation button is pressed.
     */
    onConfirm: () => void

    /**
     * Forces the button into a permanently disabled state, regardless of field configuration.
     *
     * @remarks
     * Optimally use field configuration.
     */
    hardDisable?: boolean;
}

/**
 * A reusable button component that requires user confirmation before executing an action.
 *
 * @remarks
 * The `BaseButtonWithConfirmation` temporarily switches into a confirmation state when clicked.
 * During this state, it displays confirmation and decline buttons instead of the main button label.
 * If the user does not confirm within the given timeout, the button automatically resets.
 *
 * @example
 * ```tsx
 * <BaseButtonWithConfirmation
 *   field={deleteField}
 *   infoDescription="Are you sure you want to delete this record?"
 *   confirmButtonLabel="Yes, delete"
 *   declineButtonLabel="Cancel"
 *   handleChange={(id, value) => formStore.setFieldValue(id, value)}
 *   handleBlur={(id) => formStore.validateField(id)}
 *   onConfirm={() => handleDelete()}
 * />
 * ```
 *
 * @param props - Component props.
 * @see BaseFieldModel
 */
const BaseButtonWithConfirmation: React.FC<BaseButtonWithConfirmationProps> = observer((props) => {
    const { field, hardDisable, timeout, infoDescription, confirmButtonLabel, declineButtonLabel, handleChange, handleBlur, onConfirm } = props;

    const [confirming, setConfirming] = useState(false);

    const timer = timeout || 5000;
    const isDisabled = hardDisable || field.isDisabled;

    useEffect(() => {
        if (confirming) {
            const timeoutId = setTimeout(() => setConfirming(false), timer);
            return () => clearTimeout(timeoutId);
        }
    }, [confirming, timer]);

    if (!confirming) {
        return (
            <div onClick={() => setConfirming(true)} className="cursor-pointer">
                <Button
                    className={field.style}
                    disabled={isDisabled}
                    variant={field.variant}
                    onClick={c => handleChange(field.id, c)}
                    onBlur={() => handleBlur(field.id)}
                >
                    {field.label}
                </Button>
            </div>
        );
    }

    return (
        <div
            className={`absolute bottom-4 left-4 right-4 rounded-md px-3 py-2 flex items-center justify-between gap-4 shadow
                transform origin-right transition-transform duration-[600ms] ease-in-out
                ${confirming ? "scale-x-100 opacity-100 pointer-events-auto" : "scale-x-0 opacity-0 pointer-events-none"}
                animate-in fade-in zoom-in-95`}
        >
            <p className="text-sm font-light whitespace-nowrap">
                {infoDescription || ""}
            </p>
            <div className="flex gap-2">
                <Button className="font-light" variant="secondary" size="sm" onClick={() => onConfirm()}>
                    {confirmButtonLabel || "YES"}
                </Button>
                <Button className="font-light" variant="secondary" size="sm" onClick={() => setConfirming(false)}>
                    {declineButtonLabel || "NO"}
                </Button>
            </div>
        </div>
    )
});

export default BaseButtonWithConfirmation;