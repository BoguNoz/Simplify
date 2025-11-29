import { BaseStore } from "@core/stores/base-store";
import BaseFieldModel from "@core/models/base-field-model";
import { BaseOperationFn } from "@core/events/operation";
import {autoRegister} from "@core/engine/auto-register";

class MockStore extends BaseStore {
    override fields: Record<string, BaseFieldModel> = {};
    override operations: Record<string, BaseOperationFn[]> = {};

    constructor() {
        super();
        autoRegister(this);
    }
}

export const mockStore = new MockStore();