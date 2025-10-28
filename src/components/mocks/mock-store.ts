import { BaseStore } from "@core/stores/base-store";
import BaseFieldModel from "@core/models/base-field-model";
import { BaseOperationFn } from "@core/events/operation";
import {action, makeObservable, observable} from "mobx";

class MockStore extends BaseStore {
    override fields: Record<string, BaseFieldModel> = {};
    override operations: Record<string, BaseOperationFn[]> = {};

    constructor() {
        super();

        makeObservable(this, {
            fields: observable,
            operations: observable,
            reverseDeps: observable,

            initializeFields: action,
            updateDependents: action,
            invokeDeconstructor: action,
            setFieldValue: action,
            setFieldAdditValue: action,
            setFieldState: action,
            addValidators: action,
            setFiledEditability: action,
        });
    }
}

export const mockStore = new MockStore();