import {observer} from "mobx-react-lite";
import {BaseSectionModel} from "@core/models/partials/base-section-model";
import {CardDescription, CardHeader, CardTitle, Separator} from "@core/components/ui";

const FormHeader = observer(({section}: {section: BaseSectionModel}) => {
    return !section.disable ? (
        <CardHeader>
            <CardTitle>{section.title}</CardTitle>
            <CardDescription className="text-sm text-gray-400 font-light whitespace-normal break-words mr-10">
                {section.description}
            </CardDescription>
            <Separator/>
        </CardHeader>

    ) : null;
});

export default FormHeader;