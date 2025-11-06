import BaseFieldModel from "@core/models/base-field-model";
import {BaseRenderFn} from "@core/events/render";
import {BaseSectionModel} from "@core/models/partials/base-section-model";

/**
 * Represents a composite model that groups related fields and defines its rendering behavior.
 */
export default interface BaseCompositeModel {
    /**
     * The unique identifier of the composite.
     */
    id: string;

    /**
     * A list of field configurations that belong to this composite.
     *
     * @remarks
     * Each field is initialized and managed through the composite's associated {@link BaseStore}.
     */
    fields: BaseFieldModel[];

    /**
     * A record of sections in the composite.
     * 
     * @remarks
     * Sections are used to group related fields into logical or visual parts of the composite.
     * 
     * @see BaseSectionModel
     */
    sections: BaseSectionModel[];

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
     * Cleanup function that executes when the composite is destroyed or unmounted.
     *
     * @remarks
     * To call a deconstructor function use {@link invokeCompositeDeconstructor}.
     */
    deconstructor: (...args: any[]) => void;
}
