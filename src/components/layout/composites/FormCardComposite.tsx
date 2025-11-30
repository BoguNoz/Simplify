import {BaseCompositeStore} from "@core/stores/base-composite-store";
import {BaseStore} from "@core/stores/base-store";
import composite from "@core/engine/composite";
import {observer} from "mobx-react-lite";
import {BaseSectionModel} from "@core/models/partials/base-section-model";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@core/components/ui/card";
import {ScrollArea} from "@core/components/ui/scroll-area";
import FormField from "@core/components/layout/FormField";

interface FormCardCompositeProps {
    compositeId: string;
    compositeStore: BaseCompositeStore;
    store: BaseStore;

    handleBlur?: (fieldId: string) => void;
    handleChange?: (fieldId: string, value: any) => void;

    cardWidth: number;
    cardHeight: number;
}

const FormCardComposite = composite((props: FormCardCompositeProps) => {
    const {compositeId, compositeStore, store, handleBlur, handleChange, cardWidth, cardHeight} = props;

    const composite = compositeStore.composites[compositeId];
    if (!composite) {
        return <></>;
    }

    const width = cardWidth ?? 650;
    const height = cardHeight ? `${cardHeight}px` : "850px";
    const style = `w-[${width}px] h-${height} flex flex-col`;

    return (
        <Card style={{ width: `${width}px`, height }} className="flex flex-col">
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