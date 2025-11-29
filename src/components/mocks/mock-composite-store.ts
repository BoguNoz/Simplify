import {BaseCompositeStore} from "@core/stores/base-composite-store";
import BaseCompositeModel from "@core/models/base-composite-model";
import {BaseStore} from "@core/stores/base-store";
import {autoRegister} from "@core/engine/auto-register";

class MockCompositeStore extends BaseCompositeStore {
    composites: Record<string, BaseCompositeModel> = {};
    stores: Record<string, BaseStore> = {}

    constructor() {
        super();
        autoRegister(this)
    }
}

export const mockCompositeStore = new MockCompositeStore();