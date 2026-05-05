import {BaseStore} from "@core/stores/base-store";

import {ButtonGroup} from "@core/components/ui/button-group";
import {observer} from "mobx-react-lite";
import {Button} from "@core/components/ui/button";
import {BaseCompositeInterface} from "@core/models/interfaces/base-composite-interface";
import {BaseFieldModel} from "@core/models";
import {BaseFieldTypesEnum} from "@core/models/enums/base-field-type-enum";
import {composite} from "@core/engine";
import {BaseField} from "@core/components";

interface ButtonGroupCompositeProps extends BaseCompositeInterface { }

/**
 * A composite renderer for grouped buttons.
 *
 * @remarks
 * This composite transforms each section into a `<ButtonGroup>` and each field
 * inside the section into a clickable button rendered through the polymorphic
 * `<BaseField>` engine.
 *
 * ### Key characteristics
 * - Each section maps to a horizontally grouped button strip.
 * - Each field is rendered as a button using `BaseField` with `hardTyping="Button"`.
 * - Supports MobX reactivity through `observer`.
 * - Designed for toolbars, segmented controls, toggle groups, action rows,
 *   and scenarios where fields represent actions rather than inputs.
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
 * @see composite
 * @see ButtonGroupCompositeProps
 */
const ButtonGroupComposite = composite((props: ButtonGroupCompositeProps) => {
    const {compositeId, compositeStore, store, handleBlur, handleChange} = props;

    const composite = compositeStore.composites[compositeId];
    if (!composite) {
        return <></>;
    }

    return (
        <ButtonGroup>
            {
                composite.sections.map((section) => (
                    <SectionGroup
                        key={section.type}
                        fields={section.fields}
                        store={store}
                        handleBlur={handleBlur}
                        handleChange={handleChange}
                    />
                ))
            }
        </ButtonGroup>
    );
});

const SectionGroup = observer(({ fields, store, handleBlur, handleChange }:
   {fields: BaseFieldModel[], store: BaseStore, handleBlur?: (fieldId: string) => void, handleChange?: (fieldId: string, value: any) => void }) => {

    return (
        <ButtonGroup>
            {
                fields.map((field) => (
                    <Item
                        key={field.id}
                        fieldId={field.id}
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
        <Button asChild>
            <BaseField
                fieldId={fieldId}
                store={store}
                handleBlur={handleBlur}
                handleChange={handleChange}
                hardTyping={BaseFieldTypesEnum.Button}
            />
        </Button>

    );
});

export {ButtonGroupComposite};