import {BaseCompositeStore} from "@core/stores/base-composite-store";
import {BaseStore} from "@core/stores/base-store";

import composite from "@core/engine/composite";
import {ButtonGroup} from "@core/components/ui/button-group";
import {observer} from "mobx-react-lite";
import BaseField from "@core/components/layout/BaseField";
import BaseFieldTypesEnum from "@core/enums/base-field-type-enum";

interface ButtonGroupCompositeProps {
    compositeId: string;
    compositeStore: BaseCompositeStore;
    store: BaseStore;

    handleBlur?: (fieldId: string) => void;
    handleChange?: (fieldId: string, value: any) => void;
}

/**
 * A composite renderer for grouped buttons.
 *
 * @remarks
 * - This composite arranges its sections and fields into nested <ButtonGroup> layouts.
 * - Each section becomes a horizontal group of buttons.
 * - Each field inside a section is rendered using the polymorphic <BaseField> engine.
 * - Ideal for toolbars, action panels, segmented button controls and switcher layouts.
 * - **Important** in order for composite to work optimally do not forgot to add `section.id` to all sections.
 *
 * @example
 * // Render
 * <ButtonGroupComposite
 *   compositeId="toolbar"
 *   compositeStore={compositeStore}
 *   store={store}
 * />
 *
 * @see BaseField
 * @see composite()
 */
const ButtonGroupComposite = composite((props: ButtonGroupCompositeProps) => {
    const {compositeId, compositeStore, store, handleBlur, handleChange} = props;

    const composite = compositeStore.composites[compositeId];
    if (!composite) {
        return <></>;
    }

    console.warn(composite);

    return (
        <ButtonGroup>
            {
                composite.sections.map((section) => (
                    <SectionGroup
                        key={section.id}
                        fieldIds={section.fieldsIds}
                        store={store}
                        handleBlur={handleBlur}
                        handleChange={handleChange}
                    />
                ))
            }
        </ButtonGroup>
    );
});

const SectionGroup = observer(({ fieldIds, store, handleBlur, handleChange }:
   {fieldIds: string[], store: BaseStore, handleBlur?: (fieldId: string) => void, handleChange?: (fieldId: string, value: any) => void }) => {

    return (
        <ButtonGroup>
            {
                fieldIds.map((fieldId) => (
                    <Item
                        key={fieldId}
                        fieldId={fieldId}
                        store={store}
                        handleBlur={handleBlur}
                        handleChange={handleChange}
                    />
                ))
            }
        </ButtonGroup>
    );
});

const Item = observer(({ fieldId, store, handleBlur, handleChange }:
   {fieldId: string, store: BaseStore, handleBlur?: (fieldId: string) => void, handleChange?: (fieldId: string, value: any) => void }) => {

    return (
        <BaseField
            fieldId={fieldId}
            store={store}
            handleBlur={handleBlur}
            handleChange={handleChange}
            hardTyping={BaseFieldTypesEnum.Button}
        />
    );
});

export default ButtonGroupComposite;