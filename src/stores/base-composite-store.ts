import { isNullOrUndefined } from "@core/lib/utils";
import BaseCompositeModel from "@core/models/base-composite-model";
import {BaseStore} from "@core/stores/base-store";
import {observable, runInAction} from "mobx";

export class BaseCompositeStore {
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
     * Returns the render state of a composite.
     *
     * @param {string} id - The ID of the composite.
     * @returns {boolean} `true` if the composite should be rendered otherwise `false`.
     */
    renderComposite = (id: string): boolean => {
        return this.renderedComposites.get(id)!;
    }

    setRendering = (id: string, state?: boolean): void => {
        runInAction(() => {
            if (isNullOrUndefined(state)) {
                this.composites[id].render = this.composites[id].renderFn(this, this.stores[id]);
            }
            else {
                this.composites[id].render = state!;
            }
            this.renderedComposites.set(id, his.composites[id].render);
        });
    }

    registerStore = (id: string, store: BaseStore): void => {
        this.stores[id] = store;
    }

    getStore = (id: string): BaseStore => {
        return this.stores[id];
    }
}


