import { isNullOrUndefined } from "@core/lib/utils";
import BaseCompositeModel from "@core/models/base-composite-model";
import {BaseStore} from "@core/stores/base-store";
import {observable, runInAction} from "mobx";
import {modeToPercentage} from "@core/models/utils/base-composite-model-utils";

/**
 * Abstract base class that manages a collection of composites and their corresponding field stores.
 *
 * @remarks
 * The {@link BaseCompositeStore} acts as a coordinator between multiple {@link BaseStore} instances,
 * handling initialization, rendering logic, and registration of composites.
 * Each composite represents a logical group of fields that can be conditionally rendered
 * and validated as a unit.
 *
 * @example
 * ```ts
 * // Example base implementation:
 * export class CompositeStore extends BaseCompositeStore {
 *     composites: Record<string, BaseCompositeModel> = {};
 *     stores: Record<string, BaseStore> = {}
 *
 *     constructor() {
 *         super();
 *         autoRegister(this)
 *     }
 * }
 *
 * export const compositeStore = new CompositeStore();
 * ```
 * 
 * ```ts
 * // Example store initialization 
 * compositeStore.registerStore(compositeId, store);
 * await compositeStore.initializeFields(compositeId);
 * ```
 *
 * @abstract
 * @see BaseCompositeStore.initializeComposite
 * @see BaseCompositeStore.initializeFields
 * @see BaseCompositeStore.renderComposite
 * @see BaseCompositeStore.setRendering
 * @see BaseCompositeStore.registerStore
 * @see BaseCompositeStore.getStore
 * @see BaseCompositeStore.invokeCompositeDeconstructor
 * @see autoRegister
 * @see getCompositeDimensions
 */
export abstract class BaseCompositeStore {
    composites: Record<string, BaseCompositeModel> = {};
    stores: Record<string, BaseStore> = {};
    renderedComposites = observable.map<string, boolean>();

    /**
     * Initializes all composites based on their configuration.
     *
     * @remarks 
     * - Determines whether each composite should be rendered base on composite render field.
     *  
     * @param {BaseCompositeModel[]} composites - List of composites configurations
     */
    initializeComposite = (composites: BaseCompositeModel[]): void =>  {
        composites.forEach((composite: BaseCompositeModel) => {
            runInAction(() => {
                this.composites[composite.id] = composite;
                this.renderedComposites.set(composite.id, composite.render);
            });
        })
    }

    /**
     * Invokes initialization of fields within a composite.
     * 
     * @param {string} id - The ID of the composite.
     */
    initializeFields = async (id: string): Promise<void> => {
        const composite = this.composites[id];
        const store = this.stores[id];
        await store.initializeFields(composite.fields);
    }

    /**
     * Returns the render state of the composite.
     *
     * @param {string} id - The ID of the composite.
     * @returns {boolean} `true` if the composite should be rendered otherwise `false`.
     */
    renderComposite = (id: string): boolean => {
        return this.renderedComposites.get(id)!;
    }

    /**
     * Sets the render state of a composite.
     *
     * @remarks
     * - If the `state` parameter is not specified, the composite's {@link BaseCompositeModel.renderFn `renderFn`}
     * will be used to determine whether the composite should be rendered.
     *
     * @param {string} id - The ID of the composite.
     * @param {boolean} [state] - The desired render state. If omitted, the state is determined automatically.
     */
    setRendering = (id: string, state?: boolean): void => {
        runInAction(() => {
            if (isNullOrUndefined(state)) {
                this.composites[id].render = this.composites[id].renderFn(this, this.stores[id]);
            }
            else {
                this.composites[id].render = state!;
            }
            this.renderedComposites.set(id, this.composites[id].render);
        });
    }

    /**
     * Registers a store for the specified composite.
     *
     * @param {string} id - The ID of the composite.
     * @param {BaseStore} store - The store instance to register.
     */
    registerStore = (id: string, store: BaseStore): void => {
        runInAction(() => {
            this.stores[id] = store;
        });
    }

    /**
     * Retrieves the store associated with the specified composite.
     *
     * @param {string} id - The ID of the composite.
     * @returns {BaseStore} The store instance linked to the composite.
     */
    getStore = (id: string): BaseStore => this.stores[id];

    /**
     * Calculates the final pixel dimensions for a composite.
     *
     * @remarks
     * The dimension is computed in two steps:
     *
     * 1. Base width and height percentages are derived from the composite `mode`
     *    using {@link modeToPercentage}.
     *
     * 2. Both dimensions are additionally scaled using the composite `size`.
     *
     * The final values are then converted from percentages to **absolute pixel sizes**
     * based on the current viewport dimensions (`window.innerWidth` and `window.innerHeight`).
     *
     * This ensures that composites have consistent physical size on screen,
     * independent of scrollable content or layout changes.
     *
     * @param compositeId - Identifier of the composite whose dimensions will be computed.
     * @returns A tuple `[widthPx, heightPx]` containing the final pixel dimensions.
     */
    getCompositeDimensions = (compositeId: string) => {
        const composite = this.composites[compositeId];

        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;

        const [w, h] = modeToPercentage(composite.mode);
        const sizeFactor = composite.size;

        return [
            viewportWidth * (w / 100) * sizeFactor,
            viewportHeight * (h / 100) * sizeFactor
        ];
    }

    /**
     * Invokes the deconstructor for a specific composite and all of its fields.
     * 
     * @remarks
     * - This method first executes the composite's own `deconstructor` function,
     * and then recursively calls the `invokeDeconstructor` method on each field
     * belonging to the composite.
     * 
     * - If the `free` parameter is set to `true`, both the composite and its fields
     * are removed from their respective stores after deconstruction.
     * 
     * - If any of the composite's fields require arguments for their deconstructors,
     * make sure to invoke those field deconstructors manually beforehand.
     * 
     * 
     * @param {string} id - The ID of the composite to deconstruct.
     * @param {boolean} free - Whether the composite and its fields should be removed from the store after deconstruction.
     * @param {...any[]} args - Optional arguments passed to the composite's deconstructor.
     *
     * @see invokeDeconstructor
     */
    invokeCompositeDeconstructor = async (id: string, free: boolean, ...args: any[]) => {
        if (!Object.keys(this.composites).includes(id)) {
            return;
        }
        
        const composite = this.composites[id];
        await composite.deconstructor(args);

        const fieldStore = this.getStore(id);
        for (const f of composite.fields) {
            await fieldStore.invokeDeconstructor(f.id, free);
        }

        if (free) {
            delete this.composites[id];
        }
    }
}


