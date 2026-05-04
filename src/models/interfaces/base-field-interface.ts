import {BaseStore} from "@core/stores/base-store";
import { BaseFieldTypesEnum } from "../enums/base-field-type-enum";

export interface BaseFieldInterface {
    fieldId: string;
    store: BaseStore;

    handleBlur?: (fieldId: string) => void;
    handleChange?: (fieldId: string, value: any) => void;

    hardDisable?: boolean;
    hardTyping?: BaseFieldTypesEnum;
}