import {BaseStore} from "@core/stores/base-store";
import {lang} from "@core/text/utils/lang";
import {isNullEmptyFalseOrUndefined} from "@core/lib/utils";

const text = lang();

export type ValidatorResponse = {
    isValid: boolean;
    isWarning: boolean;
    message: string;
}

export type BaseValidatorFn = (store: BaseStore, value: any, id?: string) => ValidatorResponse;

export const isEmpty = (store: BaseStore, value: any, id?: string): ValidatorResponse => {
    const isRequired = id ? store.fields[id]?.isRequired : true;

    if (!isRequired) {
        return {
            isValid: true,
            isWarning: false,
            message: "",
        };
    }

    return {
        isValid: !isNullEmptyFalseOrUndefined(value),
        isWarning: false,
        message: text.errorMessages.isEmpty,
    };
}

export const isPositive = (store: BaseStore, value: any, id?: string) => {
    if (isNullEmptyFalseOrUndefined(value)) {
        return {
            isValid: true,
            isWarning: false,
            message: "",
        }
    }

    return {
        isValid: value >= 0,
        isWarning: false,
        message: text.errorMessages.isPositive,
    }
}

export const isInteger = (store: BaseStore, value: any, id?: string) => {
    const numericValue = Number(value);
    const isValid = !isNaN(numericValue) && Number.isInteger(numericValue);

    return {
        isValid: isValid,
        isWarning: false,
        message: text.errorMessages.isInteger,
    }
}

export const isNumber = (store: BaseStore, value: any, id?: string) => {
    const numericValue = Number(value);

    return {
        isValid: !Number.isNaN(numericValue),
        isWarning: false,
        message: text.errorMessages.isNumber,
    }
}

export const isGreaterThenZero = (store: BaseStore, value: any, id?: string) => {
    if (value === undefined || value === null || value === "") {
        return {
            isValid: true,
            isWarning: false,
            message: "",
        }
    }

    return {
        isValid: value > 0,
        isWarning: false,
        message: text.errorMessages.isGreaterThenZero,
    }
}

export const isFileTypeAllowed = (store: BaseStore, value: any, id?: string) => {
    const field = store.fields[id!];

    if (field.addit!.fileMetaData.type == "") {
        return {
            isValid: true,
            isWarning: false,
            message: "",
        }
    }

    return {
        isValid: (isNullEmptyFalseOrUndefined(value)),
        isWarning: false,
        message: text.errorMessages.isWrongFileTypeError,
    }
}









