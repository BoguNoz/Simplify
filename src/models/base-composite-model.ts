import BaseFieldModel from "@core/models/base-field-model";
import {BaseRenderFn} from "@core/events/render";

export default interface BaseCompositeModel {
    id: string;
    renderFn: BaseRenderFn;
    render: boolean;

    fields: BaseFieldModel[];
}