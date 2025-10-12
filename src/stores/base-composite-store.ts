import BaseCompositeModel from "@core/models/base-composite-model.ts";
import {BaseStore} from "@core/stores/base-store.ts";
import {observable, runInAction} from "mobx";

export class BaseCompositeStore {
    composites: Record<string, BaseCompositeModel> = {};
    stores: Record<string, BaseStore> = {};
    renderedComposites = observable.map<string, boolean>();

    initializeComposite = (composites: BaseCompositeModel[]): void =>  {
        composites.forEach((composite: BaseCompositeModel) => {
            this.composites[composite.id] = composite;
            this.renderedComposites.set(composite.id, composite.render);
        })
    }

    initializeFields = async (id: string): Promise<void> => {
        const composite = this.composites[id];
        const store = this.stores[id];
        await store.initializeFields(composite.fields);
    }

    renderComposite = (id: string, fieldStore: BaseStore): boolean => {
        return this.renderedComposites.get(id)!;
    }

    setRendering = (id: string, state: boolean): void => {
        runInAction(() => {
            this.composites[id].render = state;
            this.renderedComposites.set(id, state);
        });
    }

    registerStore = (id: string, store: BaseStore): void => {
        this.stores[id] = store;
    }

    getStore = (id: string): BaseStore => {
        return this.stores[id];
    }
}


