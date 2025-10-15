import {BaseStore} from "@core/stores/base-store";
import {BaseCompositeStore} from "@core/stores/base-composite-store";

/**
 * Represents a render condition function for a composite.
 *
 * @remarks
 * Defines a rule that determines whether a composite should be displayed.  
 * It is automatically invoked by the store when rendering state is evaluated, and.
 * all function arguments are automatically injected by the store {@link setRendering}.
 *
 * @example
 * ```ts
 * // Example usage in composite repository:
 * composites.testComposite.renderFn = testRenderFunction;
 * ```
 * 
 * @param {BaseCompositeStore} store - The composite store instance managing the composite’s state.
 * @param {BaseStore} fieldStore - The field store instance associated with the composite.
 *
 * @returns {boolean} `true` if the composite should be rendered; otherwise, `false`.
 *
 */
export type BaseRenderFn = (store: BaseCompositeStore, fieldStore: BaseStore) => boolean;