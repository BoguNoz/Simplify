import {observer} from "mobx-react-lite";
import {BaseFieldModel} from "@core/models";

const Footer = observer(({ field }: { field: BaseFieldModel }) => {
    if (field.variant !== "default" && field.variant !== "secondary") return null;

    return (
        <p
            className="
                text-sm text-gray-400 font-light p-1
                line-clamp-1 overflow-hidden
                hover:line-clamp-none hover:overflow-visible
                transition-all duration-200
                cursor-default
            "
        >
            {field.description}
        </p>
    );
});

export default Footer;