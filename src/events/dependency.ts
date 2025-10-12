import {BaseStore} from "../stores/base-store";
import {isNullEmptyFalseOrUndefined} from "@core/lib/utils";

export type BaseDependencyFn = (target: string, master: string, store: BaseStore) => void | Promise<void>;

export const ifFieldEditability = async (target: string, master: string, store: BaseStore): Promise<void> => {
    const field = store.fields[target];
    const value = store.getFieldValue(master);

    field.isDisabled = isNullEmptyFalseOrUndefined(value);
}

export const ifFieldNoEditability = async (target: string, master: string, store: BaseStore): Promise<void> => {
    const field = store.fields[target];
    const value = store.getFieldValue(master);

    field.isDisabled = !isNullEmptyFalseOrUndefined(value);
}

export const ifFieldRequire = async (target: string, master: string, store: BaseStore): Promise<void> => {
    const field = store.fields[target];
    const value = store.getFieldValue(master);

    field.isRequired = !isNullEmptyFalseOrUndefined(value);
}

export const ifFieldRender = async (target: string, master: string, store: BaseStore): Promise<void> => {
    const field = store.fields[target];
    const value = store.getFieldValue(master);

    field.render = !isNullEmptyFalseOrUndefined(value);
}
