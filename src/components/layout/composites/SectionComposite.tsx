import {BaseCompositeInterface, MetadataModel} from "@core/models";
import {Button, Collapsible, CollapsibleContent, CollapsibleTrigger, ScrollArea, Separator} from "@core/components/ui";
import {composite, MetadataContext, useMetadata} from "@core/engine";
import {BaseSectionModel} from "@core/models/partials/base-section-model";
import {observer} from "mobx-react-lite";
import {BaseCompositeSectionProps} from "@core/models/interfaces/base-composite-section-props";
import {ChevronsUpDown} from "lucide-react";
import React from "react";
import {FormField} from "@core/components";

interface SectionCardCompositeProps extends BaseCompositeInterface {
    isClosed?: boolean;
}

export enum SectionCompositeSectionType {
    SECTION = "SECTION",
}

/**
 * A collapsible section-based composite renderer for partial forms.
 *
 * @remarks
 * This composite renders a single-section layout inside a collapsible UI container.
 * It is designed for compact form groups where fields should be optionally hidden
 * to save vertical space while keeping structure readable.
 *
 * It uses the composite engine to resolve sections and renders:
 *
 * - **Section** — a collapsible container with title, description, and fields.
 *   Section id: `SectionCompositeSectionType.SECTION`.
 *
 * Each field is rendered using `<FormField>` and wrapped in a `MetadataContext`
 * to dynamically scale layout based on container metadata.
 *
 * ### Key Features:
 * - Collapsible UI (expand/collapse form group)
 * - Scrollable field area (height constrained via metadata)
 * - Automatic metadata scaling (width/height adaptation)
 * - Section-level title and description rendering
 *
 * ### Use Cases:
 * - grouped form sections (e.g. "Billing info", "Address", "Settings")
 * - compact dashboards with expandable panels
 * - configuration editors
 * - side panels in admin tools
 *
 * @example
 * ```tsx
 * <SectionComposite
 *   compositeId="userSettings"
 *   compositeStore={compositeStore}
 *   store={store}
 * />
 * ```
 *
 * @see BaseCompositeInterface
 * @see BaseCompositeSectionProps
 * @see BaseSectionModel
 * @see FormField
 * @see MetadataContext
 */
const SectionComposite = composite((props: SectionCardCompositeProps) => {
    const {compositeId, compositeStore, store, handleBlur, handleChange, isClosed} = props;

    const metadata = useMetadata() ?? {} as MetadataModel;

    const composite = compositeStore.composites[compositeId];
    if (!composite) {
        return <></>;
    }

    const sectionMap = Object.fromEntries(
        composite.sections.map(section => [section.type, section])
    );

    const section= sectionMap[SectionCompositeSectionType.SECTION] ?? {} as BaseSectionModel;

    return (
        <div  style={{ width: `${metadata.width}px` }} className="flex flex-col">
            <Section
                section={section}
                store={store}
                handleBlur={handleBlur}
                handleChange={handleChange}
                metadata={metadata}
            />
        </div>
    )
});

const SectionHeader = observer(({ section, store, handleBlur, handleChange, metadata } : BaseCompositeSectionProps) => {
    return (
        <div className="flex-1 min-w-0">
            <h3 className="text-sm font-semibold">
                {section.title}
            </h3>

            {section.description && (
                <p className="
                            text-sm text-gray-400 font-light
                            mr-10 whitespace-normal break-words
                            /* Klasy odpowiedzialne za zawijanie: */
                            line-clamp-2 overflow-hidden
                            hover:line-clamp-none hover:overflow-visible
                            transition-all duration-200
                            cursor-default
                        ">
                    {section.description}
                </p>
            )}
        </div>
    )
})

interface SectionProps extends BaseCompositeSectionProps {
    isClosed?: boolean;
}


const Section = observer(({ section, store, handleBlur, handleChange, metadata, isClosed }: SectionProps) => {
    const [isOpen, setIsOpen] = React.useState(isClosed);

    const sectionMetadata = {
        ...metadata,
        width: metadata.width * 0.9,
    };

    return (
        <Collapsible
            open={isOpen}
            onOpenChange={setIsOpen}
            className="rounded-2xl border bg-white"
        >
            <div className="flex items-start justify-between gap-4 px-5 py-4">
               <SectionHeader
                   section={section}
                   handleBlur={handleBlur}
                   handleChange={handleChange}
                   metadata={metadata}
                   store={store}
               />

                <CollapsibleTrigger asChild>
                    <Button
                        variant="ghost"
                        size="icon"
                        className="size-8 shrink-0 rounded-full"
                    >
                        <ChevronsUpDown className={`h-4 w-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                    </Button>
                </CollapsibleTrigger>
            </div>

            <CollapsibleContent className="overflow-hidden data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down">
                <Separator />
                <div className="px-5 py-4">
                    <ScrollArea
                        style={{ height: `${metadata.height * 0.75}px` }}
                        className="h-full w-full"
                    >
                        <div className="flex flex-col items-center">
                            {section.fields.map(field => (
                                <MetadataContext.Provider
                                    value={sectionMetadata}
                                    key={field.id}
                                >
                                    <FormField
                                        fieldId={field.id}
                                        store={store}
                                        handleBlur={handleBlur}
                                        handleChange={handleChange}
                                    />
                                </MetadataContext.Provider>
                            ))}
                        </div>
                    </ScrollArea>
                </div>
            </CollapsibleContent>
        </Collapsible>
    );
});

export {SectionComposite};

