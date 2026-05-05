import {BaseRenderFn} from "@core/events/render";
import {BaseSectionModel} from "@core/models/partials/base-section-model";

/**
 * Represents a composite model that groups related fields and defines its rendering behavior.
 */
export interface BaseCompositeModel {
    /**
     * The unique identifier of the composite.
     */
    id: string;

    /**
     * A list of *partial composites ids* that belong to this composite.
     *
     * @remarks
     * - Partials are smaller, reusable composite fragments that partials sections
     *   inside a larger composite.
     * - Unlike full composites, partials **cannot contain their own child composites** —
     *   they can only contain fields.
     * - This property allows composing complex UIs by nesting predefined partial structures
     *   without duplicating configuration logic.
     * - Partials inherit the parent composite's lifecycle, including initialization and teardown.
     *
     */
    partials: string[];

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
     * - This value is managed by the store and can be overridden manually using {@link setRendering}.
     * - This property should only be set by using store function. 
     */
    render: boolean;

    /**
     * Defines how the composite should be rendered.
     *
     * @remarks
     * The rendering mode controls the layout behavior of the composite.
     * Different modes may change how fields, sections, and child composites
     * are arranged in the UI.
     *
     * Available modes:
     * - `page` – Standard full-page layout.
     * - `square-window` – Compact, centered container with equal width and height.
     * - `horizontal-window` – A horizontally oriented layout, useful for wide content.
     * - `vertical-window` – A vertically oriented layout, optimal for stacked content.
     */
    mode: "page" | "square-window" | "horizontal-window" | "vertical-window";

    /**
     * Controls the visual scaling factor of the composite.
     *
     * @remarks
     * This numeric value determines how much the composite should scale relative
     * to its base dimensions. The value acts as a multiplicative factor:
     *
     * @example
     * ```ts
     * size = 0.5  // Composite occupies half of its default size
     * size = 1.4  // Composite is scaled up by 40%
     * ```
     */
    size: number;

    /**
     * Cleanup function that executes when the composite is destroyed or unmounted.
     *
     * @remarks
     * To call a deconstructor function use {@link invokeCompositeDeconstructor}.
     */
    deconstructor: (...args: any[]) => void;
}
