import {BaseCompositeInterface} from "@core/components/layout/composites/interfaces/BaseCompositeInterface";
import composite from "@core/engine/composite";

interface FormProps extends BaseCompositeInterface { }

const Form = composite((props: FormProps) => {
    const {compositeId, compositeStore, store, handleBlur, handleChange} = props;

    const composite = compositeStore.composites[compositeId];
    if (!composite) {
        return <></>;
    }

    const dimensions = compositeStore.getCompositeDimensions(compositeId)


});

export default  Form;