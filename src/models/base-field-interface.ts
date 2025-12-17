import {BaseStore} from "@core/stores/base-store";
import BaseFieldTypeEnum from "@core/enums/base-field-type-enum";
import BaseCompositeModel from "@core/models/base-composite-model";

export interface BaseFieldInterface {
    fieldId: string;
    store: BaseStore;

    parent?: BaseCompositeModel;

    handleBlur?: (fieldId: string) => void;
    handleChange?: (fieldId: string, value: any) => void;

    hardDisable?: boolean;
    hardTyping?: BaseFieldTypeEnum;
};