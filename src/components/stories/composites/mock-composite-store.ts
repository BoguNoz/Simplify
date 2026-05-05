import {BaseCompositeStore} from "@core/stores/base-composite-store";
import {BaseStore} from "@core/stores/base-store";
import {autoRegister} from "@core/engine/registres/auto-register";
import { BaseCompositeModel } from "@core/models";

class MockCompositeStore extends BaseCompositeStore {
    composites: Record<string, BaseCompositeModel> = {};
    stores: Record<string, BaseStore> = {}

    constructor() {
        super();
        autoRegister(this)
    }
}

export const mockCompositeStore = new MockCompositeStore();