import BaseFieldModel from "@core/models/base-field-model.ts";
import {BaseRenderFn} from "@core/events/render.ts";

export default interface BaseCompositeModel {
    id: string;
    renderFn: BaseRenderFn;
    render: boolean;

    fields: BaseFieldModel[];
}