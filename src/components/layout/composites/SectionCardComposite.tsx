import {BaseCompositeInterface} from "@core/models";
import composite from "@core/engine/components/composite";
import {Button, Card, CardContent, Collapsible, CollapsibleContent, CollapsibleTrigger, ScrollArea, Separator} from "@core/components/ui";
import {MetadataContext, useMetadata} from "@core/engine";
import MetadataModel from "@core/models/metadata-model";
import FormHeader from "@core/components/layout/composites/partials/FormHeader";
import {BaseSectionModel} from "@core/models/partials/base-section-model";
import {observer} from "mobx-react-lite";
import {BaseCompositeSectionProps} from "@core/models/interfaces/base-composite-section-props";
import FormField from "@core/components/layout/FormField";
import {ChevronsUpDown} from "lucide-react";
import React from "react";

interface SectionCardCompositeProps extends BaseCompositeInterface { }

export enum SectionCardCompositeSectionType {
    HEADER= "HEADER",
    SECTION = "SECTION",
}

const SectionCardComposite = composite((props: SectionCardCompositeProps) => {
    const {compositeId, compositeStore, store, handleBlur, handleChange} = props;

    const metadata = useMetadata() ?? {} as MetadataModel;

    const composite = compositeStore.composites[compositeId];
    if (!composite) {
        return <></>;
    }

    const sectionMap = composite.sections.reduce<Record<string, BaseSectionModel[]>>(
        (acc, section) => {
            if (!acc[section.type]) {
                acc[section.type] = [];
            }

            acc[section.type].push(section);
            return acc;
        },
        {}
    );

    const headers = sectionMap[SectionCardCompositeSectionType.HEADER] ?? [];
    const sections = sectionMap[SectionCardCompositeSectionType.SECTION] ?? [];

    return (
        <Card style={{ width: `${metadata.width}px`, height: `${metadata.height}px` }} className="flex flex-col">
            <FormHeader
                section={headers[0]}
            />
            <ScrollArea className="flex-1 overflow-auto w-full">
                <CardContent className="space-y-2 w-full">
                    {sections.map(section => (
                        <Section
                            section={section}
                            store={store}
                            handleBlur={handleBlur}
                            handleChange={handleChange}
                            metadata={metadata}
                        />
                    ))}
                </CardContent>
            </ScrollArea>
        </Card>
    )
});


const Section = observer(({ section, store, handleBlur, handleChange, metadata }: BaseCompositeSectionProps) => {
    const [isOpen, setIsOpen] = React.useState(true);

    const sectionMetadata = {
        ...metadata,
        width: metadata.width * 0.48,
    };

    return (
        <Collapsible
            open={isOpen}
            onOpenChange={setIsOpen}
            className="rounded-2xl border bg-white overflow-hidden"
        >
            <div className="flex items-start justify-between gap-4 px-5 py-4">
                <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-semibold text-black">
                        {section.title}
                    </h3>

                    {section.description && (
                        <p className="text-sm text-gray-400 font-light whitespace-normal break-words mr-10">
                            {section.description}
                        </p>
                    )}
                </div>

                <CollapsibleTrigger asChild>
                    <Button
                        variant="ghost"
                        size="icon"
                        className="size-8 shrink-0 rounded-full"
                    >
                        <ChevronsUpDown className="h-4 w-4" />
                    </Button>
                </CollapsibleTrigger>
            </div>

            <Separator />

            <CollapsibleContent className="px-5 py-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
            </CollapsibleContent>
        </Collapsible>
    );
});

export default SectionCardComposite;

