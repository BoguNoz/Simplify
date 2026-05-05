import {BaseSectionModel} from "@core/models/partials/base-section-model";
import {BaseStore} from "@core/stores";
import { MetadataModel } from "../metadata-model";

interface BaseCompositeSectionProps {
    section: BaseSectionModel,
    store: BaseStore,
    handleBlur?: (fieldId: string) => void,
    handleChange?: (fieldId: string, value: any) => void, metadata: MetadataModel
}

export {type BaseCompositeSectionProps}