import BaseFieldModel from "@core/models/base-field-model";
import {BaseRenderFn} from "@core/events/render";

/**
 * Represents a composite model that groups related fields and defines its rendering behavior.
 */
export default interface BaseCompositeModel {
    /**
     * The unique identifier of the composite.
     */
    id: string;

    /**
     * A function used to determine whether the composite should be rendered.
     *
     * @remarks
     * This function is called automatically by the store when rendering logic needs to be updated.
     */
    renderFn: BaseRenderFn;

    /**
     * Indicates whether the composite is currently rendered.
     *
     * @remarks
     * This value is managed by the store and can be overridden manually using {@link setRendering}.
     */
    render: boolean;

    /**
     * A list of field configurations that belong to this composite.
     *
     * @remarks
     * Each field is initialized and managed through the composite's associated {@link BaseStore}.
     */
    fields: BaseFieldModel[];
}
