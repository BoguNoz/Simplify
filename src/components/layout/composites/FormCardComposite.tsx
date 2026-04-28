import {BaseStore} from "@core/stores/base-store";
import composite from "@core/engine/components/composite";
import {observer} from "mobx-react-lite";
import {BaseSectionModel} from "@core/models/partials/base-section-model";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@core/components/ui/card";
import {ScrollArea} from "@core/components/ui/scroll-area";
import FormField from "@core/components/layout/FormField";
import {BaseCompositeInterface} from "@core/models/base-composite-interface";
import MetadataModel from "@core/models/metadata-model";
import {MetadataContext, useMetadata } from "@core/engine/components/metadata-context";

interface FormCardCompositeProps extends BaseCompositeInterface {}

interface SectionProps {
    section: BaseSectionModel,
    store: BaseStore,
    handleBlur?: (fieldId: string) => void,
    handleChange?: (fieldId: string, value: any) => void, metadata: MetadataModel
}

export enum FormCardCompositeSectionType {
    HEADER= "HEADER",
    BODY = "BODY",
}

/**
 * A card-based, single section ,composite renderer for form layouts.
 *
 * @remarks
 * This composite allows rendering a form inside a styled `<Card>` layout.
 * It uses the composite engine to read sections/fields and automatically
 * build a card with:
 *
 * - **Header** — displays title & description from the first section. Section id:`FormCardCompositeSectionType.HEADER`.
 * - **Body** — scrollable list of form fields (`<FormField>`). Section id:`FormCardCompositeSectionType.BODY`.
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

const FormHeader = observer(({section}: {section: BaseSectionModel}) => {
    return !section.disable ? (
        <CardHeader>
            <CardTitle>{section.title}</CardTitle>
            <CardDescription className="text-sm text-gray-400 font-light whitespace-normal break-words mr-10">
                {section.description}
            </CardDescription>
        </CardHeader>
    ) : null;
});

const FormBody = observer(({section, store, handleBlur, handleChange, metadata}: SectionProps) => {
    return !section.disable ? (
        <ScrollArea className="flex-1 overflow-auto w-full">
            <CardContent className="space-y-2 w-full">
                {section.fieldsIds.map(fieldId => (
                    <MetadataContext.Provider value={metadata} key={fieldId}>
                        <FormField
                            fieldId={fieldId}
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