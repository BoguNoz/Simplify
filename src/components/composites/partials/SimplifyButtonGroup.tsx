import { ButtonGroup } from "@core/components/ui/button-group";
import composite from "@core/engine/composite";
import { BaseCompositeStore } from "@core/stores/base-composite-store";
import { BaseStore } from "@core/stores/base-store";
import React from "react";

interface SimplifyButtonGroupProps {
    compositeId: string;
    compositeStore: BaseCompositeStore;
    store: BaseStore;
}

const SimplifyButtonGroup: React.FC<SimplifyButtonGroupProps> = composite((props) => {
    const {compositeId, compositeStore, store} = props;

    const composite = compositeStore.composites[compositeId];
    if (!composite) {
        return null
    }

    return (
        <ButtonGroup>
            
        <ButtonGroup>
    );
});

export default SimplifyButtonGroup;

