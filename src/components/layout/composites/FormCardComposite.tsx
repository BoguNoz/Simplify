import composite from "@core/engine/components/composite";
import {BaseSectionModel} from "@core/models/partials/base-section-model";
import {Card, CardContent} from "@core/components/ui/card";
import {BaseCompositeInterface} from "@core/models/interfaces/base-composite-interface";
import MetadataModel from "@core/models/metadata-model";
import {MetadataContext, useMetadata} from "@core/engine/components/metadata-context";
import FormHeader from "@core/components/layout/composites/partials/FormHeader";
import {observer} from "mobx-react-lite";
import {BaseCompositeSectionProps} from "@core/models/interfaces/base-composite-section-props";
import {ScrollArea, Separator} from "@core/components/ui";
import FormField from "@core/components/layout/FormField";
import React from "react";

interface FormCardCompositeProps extends BaseCompositeInterface {}

export enum FormCardCompositeSectionType {
    HEADER= "HEADER",
    BODY = "BODY",
}

/**
 * A card-based, single section ,composite renderer for partials layouts.
 *
 * @remarks
 * This composite allows rendering a partials inside a styled `<Card>` layout.
 * It uses the composite engine to read sections/fields and automatically
 * build a card with:
 *
 * - **Header** — displays title & description from the first section. Section id:`FormCardCompositeSectionType.HEADER`.
 * - **Body** — scrollable list of partials fields (`<FormField>`). Section id:`FormCardCompositeSectionType.BODY`.
 *
 * This makes it ideal for:
 * - modal forms,
 * - detail/edit panels,
 * - card-based property inspectors,
 * - dashboard side panels.
 *
 * @example
 * ```tsx
 * <FormCardComposite
 *   compositeId="userForm"
 *   compositeStore={compositeStore}
 *   store={store}
 * />
 * ```
 * ```tsx
 * <FormCardComposite
 *   compositeId="userForm"
 *   compositeStore={compositeStore}
 *   store={store}
 * />
 * ```
 *
 * @see BaseCompositeStore
 * @see BaseStore
 * @see FormField
 */
const FormCardComposite = composite((props: FormCardCompositeProps) => {
    const {compositeId, compositeStore, store, handleBlur, handleChange} = props;

    const metadata = useMetadata() ?? {} as MetadataModel;

    const composite = compositeStore.composites[compositeId];
    if (!composite) {
        return <></>;
    }

    const sectionMap = Object.fromEntries(
        composite.sections.map(section => [section.type, section])
    );

    const header = sectionMap[FormCardCompositeSectionType.HEADER] ?? {} as BaseSectionModel;
    const body = sectionMap[FormCardCompositeSectionType.BODY] ?? {} as BaseSectionModel;


    return (
        <Card style={{ width: `${metadata.width}px`, height: `${metadata.height}px` }} className="flex flex-col">
            <FormHeader
                section={header}
            />
            <FormBody
                section={body}
                store={store}
                handleBlur={handleBlur}
                handleChange={handleChange}
                metadata={metadata}
            />
        </Card>
    );
});

const FormBody = observer(({section, store, handleBlur, handleChange, metadata}: BaseCompositeSectionProps) => {
    return !section.disable ? (
        <ScrollArea className="flex-1 overflow-auto w-full">
            <CardContent className="space-y-2 w-full">
                {section.fields.map(field => (
                    <MetadataContext.Provider value={metadata} key={field.id}>
                        <FormField
                            fieldId={field.id}
                            store={store}
                            handleBlur={handleBlur}
                            handleChange={handleChange}
                        />
                    </MetadataContext.Provider>
                ))}
            </CardContent>
        </ScrollArea>
    ) : null;
});

export default FormCardComposite;