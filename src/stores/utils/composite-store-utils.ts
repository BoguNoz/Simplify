import {BaseStore} from "../base-store";
import {BaseCompositeStore} from "../base-composite-store";

/**
 * Registers a composite in the store and initializes its fields.
 *
 * @param {string} compositeId - The ID of the composite.
 * @param {BaseCompositeStore} compositeStore - The composite store instance to register.
 * @param {BaseStore} store - The parent field store where the composite will be registered.
 */
export const baseContainerInitializationSetup = async (compositeId: string, compositeStore: BaseCompositeStore, store: BaseStore) => {
    compositeStore.registerStore(compositeId, store);
    await compositeStore.initializeFields(compositeId);
}