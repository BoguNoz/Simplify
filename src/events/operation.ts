import {BaseStore} from "@core/stores/base-store";

export type BaseOperationFn = (target: any, store: BaseStore, value?: any,) => void | Promise<void>;

export const toggleRendering = (targetIds: string[], store: BaseStore): BaseOperationFn => {
    return () => {
        targetIds.forEach((id) => {
            const field = store.fields[id];
            if (!field) return;

            field.render = !field.render;
        })
    }
}

export const setFieldValue = (targetId: string, store: BaseStore, value: any): BaseOperationFn => {
    return () => {
        store.setFieldValue(targetId, value);
    }
}