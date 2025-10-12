import {BaseStore} from "../base-store";
import {BaseCompositeStore} from "../base-composite-store";

export const baseContainerInitializationSetup = async (compositeId: string, compositeStore: BaseCompositeStore, store: BaseStore) => {
    compositeStore.registerStore(compositeId, store);
    await compositeStore.initializeFields(compositeId);
}