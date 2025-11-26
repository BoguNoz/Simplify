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
     * Indicates whether the composite is a *partial composite*.
     *
     * @remarks
     * -  **Partial composite** is initialized, and store registered, by parent composite.
     * - A **partial composite** is a specialized composite that exists as a
     *   fragment of a larger parent composite.
     * - Partial composites are used to break down complex UI structures into smaller,
     *   reusable segments.
     * - Partial composites **cannot contain child composites**. They may contain only fields.
     * - Typically used for grouping logical parts of a form without representing a standalone component.
     */
    isPartial: boolean;

    /**
     * A list of *partial composites* that belong to this composite.
     *
     * @remarks
     * - Partials are smaller, reusable composite fragments that form sections
     *   inside a larger composite.
     * - Unlike full composites, partials **cannot contain their own child composites** —
     *   they can only contain fields.
     * - This property allows composing complex UIs by nesting predefined partial structures
     *   without duplicating configuration logic.
     * - Partials inherit the parent composite's lifecycle, including initialization and teardown.
     *
     * @see isPartial
     */
    partials: BaseCompositeModel[];

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
