import {BaseCompositeInterface} from "@core/models";
import composite from "@core/engine/components/composite";

interface SectionCardCompositeProps extends BaseCompositeInterface { }

const SectionCardComposite = composite((props: SectionCardCompositeProps) => {
    return (<div></div>)
});

export default SectionCardComposite;

