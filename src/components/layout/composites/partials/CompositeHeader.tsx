import {observer} from "mobx-react-lite";
import {BaseSectionModel} from "@core/models/partials/base-section-model";
import {CardDescription, CardHeader, CardTitle, Separator} from "@core/components/ui";

const CompositeHeader = observer(({section}: {section: BaseSectionModel}) => {
    return !section.disable ? (
        <CardHeader>
            <CardTitle>{section.title}</CardTitle>
            <p className=" text-sm text-gray-400 font-light p-1 line-clamp-3 overflow-hidden hover:line-clamp-none hover:overflow-visible transition-all duration-200 cursor-default " >
                {section.description}
            </p>
            <Separator/>
        </CardHeader>

    ) : null;
});

export default CompositeHeader;