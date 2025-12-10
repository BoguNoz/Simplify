import { makeObservable, observable, action } from "mobx";

/**
 * Automatically registers all properties and methods of a store for MobX reactivity.
 *
 * @remarks
 * This helper function iterates over all instance properties and prototype methods
 * of a given store object and applies MobX annotations automatically:
 * - All instance properties are annotated as `observable`.
 * - All prototype methods are annotated as `action`.
 *
 * This removes the need to manually call `makeObservable` with explicit annotations
 * for each field and method, reducing boilerplate in your MobX stores.
 *
 *
 * @param store - The store instance to automatically register with MobX.
 */
export const autoRegister = (store: any) => {
    const proto = Object.getPrototypeOf(store);

    const annotations: any = {};

    for (const key of Object.keys(store)) {
        annotations[key] = observable;
    }

    for (const key of Object.getOwnPropertyNames(proto)) {
        if (key === "constructor") continue;
        if (typeof store[key] === "function") {
            annotations[key] = action;
        }
    }

    makeObservable(store, annotations);
}
