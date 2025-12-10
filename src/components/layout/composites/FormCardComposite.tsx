import {BaseCompositeStore} from "@core/stores/base-composite-store";
import {BaseStore} from "@core/stores/base-store";
import composite from "@core/engine/composite";
import {observer} from "mobx-react-lite";
import {BaseSectionModel} from "@core/models/partials/base-section-model";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@core/components/ui/card";
import {ScrollArea} from "@core/components/ui/scroll-area";
import FormField from "@core/components/layout/FormField";
import {BaseCompositeInterface} from "@core/components/layout/composites/interfaces/BaseCompositeInterface";

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

    const composite = compositeStore.composites[compositeId];
    if (!composite) {
        return <></>;
    }

    const dimensions = compositeStore.getCompositeDimensions(compositeId)

    return (
        <Card style={{ width: `${dimensions[0]}px`, height: `${dimensions[1]}px` }} className="flex flex-col">
            <FormHeader
                section={composite.sections[0]}
            />
            <FormBody
                section={composite.sections[0]}
                store={store}
                handleBlur={handleBlur}
                handleChange={handleChange}
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

const FormBody = observer(({section, store, handleBlur, handleChange}:
   {section: BaseSectionModel, store: BaseStore, handleBlur?: (fieldId: string) => void,  handleChange?: (fieldId: string, value: any) => void}) => {
    return (
        <ScrollArea className="flex-1 overflow-auto">
            <CardContent className="space-y-2">
                {section.fieldsIds.map(fieldId => (
                    <FormField
                        key={fieldId}
                        fieldId={fieldId}
                        store={store}
                        handleBlur={handleBlur}
                        handleChange={handleChange}
                    />
                ))}
            </CardContent>
        </ScrollArea>
    );
});

export default FormCardComposite;