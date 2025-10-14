import {BaseStore} from "@core/stores/base-store";
import {BaseCompositeStore} from "@core/stores/base-composite-store";

export type BaseRenderFn = (store: BaseCompositeStore, fieldStore: BaseStore) => boolean;