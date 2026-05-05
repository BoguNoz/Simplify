import {observer} from "mobx-react-lite";
import {Button} from "@core/components/ui/button";
import {BaseFieldModel} from "@core/models";

interface BaseRawButtonProps {
    field: BaseFieldModel;

    handleChange: (fieldId: string, value: any) => void;
    handleBlur: (fieldId: string) => void;

    hardDisable?: boolean;

}

/**
 * A base button component that renders a raw button with optional icon or text label.
 *
 * @remarks
 * - This component uses the {@link BaseFieldModel} to control its state, appearance, and behavior.
 * - If the `field.label` is a React component (not a string), it will be rendered as an icon.
 * - The `handleChange` callback is called when the button is clicked.
 * - The `handleBlur` callback is called when the button loses focus.
 * - `hardDisable` forces the button to be disabled regardless of the field state.
 *
 * @example
 * ```tsx
 * <BaseButton
 *   field={formFields.saveButton}
 *   handleChange={(id, value) => console.log("Clicked:", id)}
 *   handleBlur={(id) => console.log("Blur:", id)}
 *   hardDisable={false}
 * />
 * ```
 *
 * @see BaseFieldModel
 */
const BaseButton = observer((props: BaseRawButtonProps) => {
    const {field, handleChange, handleBlur, hardDisable} = props;

    const isDisabled = hardDisable || field.isDisabled;
    const isIcon = typeof field.label !== "string";

    return (
        <Button
            className={field.style}
            size={isIcon ? "icon" : "default"}
            disabled={isDisabled}
            variant={field.variant}
            onClick={c => handleChange(field.id, c)}
            onBlur={() => handleBlur(field.id)}
        >
            <>{isIcon ? <field.label /> : field.label}</>
        </Button>
    )
});

export {BaseButton};