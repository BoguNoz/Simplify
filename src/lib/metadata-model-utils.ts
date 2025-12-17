import BaseCompositeModel from "@core/models/base-composite-model";
import MetadataModel from "@core/models/metadata-model";
import {computeCompositeSize, modeToPercentage} from "@core/lib/base-composite-model-utils";

export const getMetadata = (composite: BaseCompositeModel): MetadataModel => {

   const size = computeCompositeSize(composite.mode, composite.size)
    return  {
        parentId: composite.id,
        width: size[0],
        height: size[1],
    } as MetadataModel;
}