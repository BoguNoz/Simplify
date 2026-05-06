import {
    Button,
    ScrollArea,
    Separator,
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger
} from "@core/components/ui";
import { ChevronRight, ChevronLeft } from "lucide-react";
import {BaseCompositeInterface, BaseCompositeSectionProps, BaseSectionModel, MetadataModel} from "@core/models";
import {composite, MetadataContext, useMetadata} from "@core/engine";
import {cn} from "@core/lib";
import {observer} from "mobx-react-lite";

interface SheetCompositeProps extends BaseCompositeInterface {
    children?: React.ReactNode;
}

export enum SheetCompositeSectionType {
    HEADER= "HEADER",
}

const SheetComposite = composite((props: SheetCompositeProps) => {
    const {compositeId, compositeStore, store, handleBlur, handleChange, children} = props;
    const metadata = useMetadata() ?? {} as MetadataModel;

    const composite = compositeStore.composites[compositeId];
    if (!composite) return null;

    const sectionMap = Object.fromEntries(
        composite.sections.map(section => [section.type, section])
    );
    const header = sectionMap[SheetCompositeSectionType.HEADER] ?? {} as BaseSectionModel;

    return (
        <Sheet modal={false}>
            <ArrowLeft/>
            <SheetContent
                side="left"
                className="transition-transform duration-300 ease-in-out p-0 overflow-hidden"
                style={{
                    width: `${metadata.width}px`,
                    height: '100vh'
                }}
            >
                <ArrowRight/>

                <div className="flex flex-col h-full">
                    <div className="shrink-0">
                        <PanelHeader
                            section={header}
                            handleBlur={handleBlur}
                            handleChange={handleChange}
                            metadata={metadata}
                            store={store}
                        />
                    </div>

                    <ScrollArea className="flex-1 w-full min-h-0">
                        <MetadataContext.Provider value={metadata}>
                            <div className="flex flex-col gap-4 px-8 pb-8 pt-4">
                                {children}
                            </div>
                        </MetadataContext.Provider>
                    </ScrollArea>
                </div>
            </SheetContent>
        </Sheet>
    );
});

const ArrowLeft = observer(() => {
    return (
        <SheetTrigger asChild>
            <Button
                variant="secondary"
                size="icon"
                className={cn(
                    "fixed left-0 top-1/9 -translate-y-1/2",
                    "rounded-l-none rounded-r-md shadow-md",
                    "bg-background border-border border-l-0",
                    "hover:bg-accent hover:text-accent-foreground"
                )}
            >
                <ChevronRight className="h-4 w-4" />
            </Button>
        </SheetTrigger>
    )
})

const ArrowRight  = observer(() => {
    return (
        <SheetTrigger asChild>
            <Button
                variant="secondary"
                size="icon"
                className={cn(
                    "absolute -right-10 top-1/9 -translate-y-1/2 z-50",
                    "rounded-l-none rounded-r-md shadow-md",
                    "bg-background border-border border-l-0",
                    "hover:bg-accent hover:text-accent-foreground"
                )}
            >
                <ChevronLeft className="h-4 w-4" />
            </Button>
        </SheetTrigger>
    )
});

const PanelHeader = observer(({ section, store, handleBlur, handleChange, metadata } : BaseCompositeSectionProps) => {
    return !section.disable ? (
        <div className="px-8 pt-4 pb-4 space-y-4">
            <SheetHeader className="text-left space-y-1.5">
                <SheetTitle className="text-2xl font-semibold leading-none tracking-tight text-foreground">
                    {section.title}
                </SheetTitle>

                {section.description && (
                    <p className={cn(
                        "text-sm text-muted-foreground font-light leading-relaxed",
                        "line-clamp-2 hover:line-clamp-none transition-all duration-300 cursor-default"
                    )}>
                        {section.description}
                    </p>
                )}
            </SheetHeader>
            <Separator className="mt-4" />
        </div>
    ) : null;
})


export { SheetComposite };