import BaseCompositeModel from "@core/models/base-composite-model";
import MetadataModel from "@core/models/metadata-model";

// TODO Dokończyć generowanie metadanych. Najprawdopodobniej zmienić generowanie rozmiaru w copozycie
export const getMetadata = (composite: BaseCompositeModel): MetadataModel => {
    return  {
        parentId: composite.id,
    } as MetadataModel;
}