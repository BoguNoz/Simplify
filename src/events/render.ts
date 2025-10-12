import {BaseStore} from "@core/stores/base-store.ts";
import {BaseCompositeStore} from "@core/stores/base-composite-store.ts";

export type BaseRenderFn = (store: BaseCompositeStore, fieldStore: BaseStore, value?: any) => boolean;