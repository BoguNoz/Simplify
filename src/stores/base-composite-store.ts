import { isNullOrUndefined } from "@core/lib/utils";
import BaseCompositeModel from "@core/models/base-composite-model";
import {BaseStore} from "@core/stores/base-store";
import {observable, runInAction} from "mobx";

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
 *
 *         makeObservable(this, {
 *             composites: observable,
 *             stores: observable,
 *             renderedComposites: observable,
 *
 *             initializeComposite: action,
 *             initializeFields: action,
 *             renderComposite: action,
 *             setRendering: action,
 *             registerStore: action,
 *             getStore: action,
 *             invokeCompositeDeconstructor: action,
 *         });
 *     }
 * }
 *
 * export const compositeStore = new CompositeStore();
 * ```
 *
 * @abstract
 * @see BaseStore
 * @see BaseCompositeModel
 */
export abstract class BaseCompositeStore {
    composites: Record<string, BaseCompositeModel> = {};
    stores: Record<string, BaseStore> = {};
    renderedComposites = observable.map<string, boolean>();

    /**
     * Initializes all composites based on their configuration.
     *
     * @remarks 
     * Determines whether each composite should be rendered base on composite render field.
     *  
     * @param {BaseCompositeModel[]} composites - List of composites configurations
     */
    initializeComposite = (composites: BaseCompositeModel[]): void =>  {
        composites.forEach((composite: BaseCompositeModel) => {
            this.composites[composite.id] = composite;
            this.renderedComposites.set(composite.id, composite.render);
        })
    }

    /**
     * Invokes initialization of fields within a composite.
     * 
     * @param {string} id - The ID of he composite.
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
     * If the `state` parameter is not specified, the composite's {@link BaseCompositeModel.renderFn `renderFn`}
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
        this.stores[id] = store;
    }

    /**
     * Retrieves the store associated with the specified composite.
     *
     * @param {string} id - The ID of the composite.
     * @returns {BaseStore} The store instance linked to the composite.
     */
    getStore = (id: string): BaseStore => this.stores[id];

    /**
     * Invokes the deconstructor for a specific composite and all of its fields.
     * 
     * @remarks
     * This method first executes the composite's own `deconstructor` function,
     * and then recursively calls the `invokeDeconstructor` method on each field
     * belonging to the composite.
     * 
     * If the `free` parameter is set to `true`, both the composite and its fields
     * are removed from their respective stores after deconstruction.
     * 
     * If any of the composite's fields require arguments for their deconstructors,
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


