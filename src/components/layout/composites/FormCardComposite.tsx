import {BaseStore} from "@core/stores/base-store";
import composite from "@core/engine/composite";
import {observer} from "mobx-react-lite";
import {BaseSectionModel} from "@core/models/partials/base-section-model";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@core/components/ui/card";
import {ScrollArea} from "@core/components/ui/scroll-area";
import FormField from "@core/components/layout/FormField";
import {BaseCompositeInterface} from "@core/models/base-composite-interface";
import MetadataModel from "@core/models/metadata-model";
import {MetadataContext, useMetadata } from "@core/engine/metadata-context";

interface FormCardCompositeProps extends BaseCompositeInterface { }

/**
 * A card-based, single section ,composite renderer for form layouts.
 *
 * @remarks
 * This composite allows rendering a form inside a styled `<Card>` layout.
 * It uses the composite engine to read sections/fields and automatically
 * build a card with:
 *
 * - **Header** — displays title & description from the first section.
 * - **Body** — scrollable list of form fields (`<FormField>`).
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

    return (
        <Card style={{ width: `${metadata.width}px`, height: `${metadata.height}px` }} className="flex flex-col">
            <FormHeader
                section={composite.sections[0]}
            />
            <FormBody
                section={composite.sections[0]}
                store={store}
                handleBlur={handleBlur}
                handleChange={handleChange}
                metadata={metadata}
            />
        </Card>
    );
});

const FormHeader = observer(({section}: {section: BaseSectionModel}) => {
    return (
        <CardHeader>
            <CardTitle>{section.title}</CardTitle>
            <CardDescription className="text-sm text-gray-400 font-light whitespace-normal break-words mr-10">
                {section.description}
            </CardDescription>
        </CardHeader>
    );
});

const FormBody = observer(({section, store, handleBlur, handleChange, metadata}:
   {section: BaseSectionModel, store: BaseStore, handleBlur?: (fieldId: string) => void,  handleChange?: (fieldId: string, value: any) => void, metadata: MetadataModel}) => {
    return (
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
    );
});

export default FormCardComposite;