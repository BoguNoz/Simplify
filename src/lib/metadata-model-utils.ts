import {computeCompositeSize} from "@core/lib/base-composite-model-utils";
import {BaseCompositeStore} from "@core/stores/base-composite-store";
import {MetadataModel} from "@core/models";

export const getMetadata = (compositeId: string, compositeStore: BaseCompositeStore): MetadataModel => {

    const composite = compositeStore.composites[compositeId];

   const size = computeCompositeSize(composite.mode , composite.size)
    return  {
        width: size[0],
        height: size[1],
    } as MetadataModel;
}