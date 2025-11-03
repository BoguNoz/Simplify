import {BaseStore} from "@core/stores/base-store";
import {lang} from "@core/text/utils/lang";
import {isNullEmptyFalseOrUndefined} from "@core/lib/utils";

const text = lang();

/**
 * Represents the result of a field validation.
 */
export type ValidatorResponse = {
    /**
     * Indicates whether the field value is valid.
     */
    isValid: boolean;

    /**
     * Indicates whether the response is a warning instead of a strict validation error.
     */
    isWarning: boolean;

    /**
     * A message describing the validation result or error.
     */
    message: string;
}

/**
 * Represents a validator function that checks a field’s value.
 *
 * @remarks  
 * - All function arguments are automatically injected by the store during field validation.
 * - Validators should be lightweight and synchronous when possible.  
 * - For complex logic or async workflows, use operations instead.
 * 
 * @example
 * ```ts
 * // Example custom validator:
 * const isEmail = (store, value) => ({
 *   isValid: /\S+@\S+\.\S+/.test(value),
 *   isWarning: false,
 *   message: "Invalid email address"
 * });
 * ```
 * ```ts
 * // Example usage in repository:
 * repositoryFields.testField.validators = [testValidator]
 * ```
 * 
 * 
 * @param {BaseStore} store - The store instance containing the field being validated.
 * @param {any} value - The current field value.
 * @param {string} [id] - The ID of validated field.
 *
 * @returns {ValidatorResponse} The validation result object.
 *
 * @see BaseStore
 */
export type BaseValidatorFn = (store: BaseStore, value: any, id: string) => ValidatorResponse;

/**
 * Validates that a field is not empty.
 *
 * @remarks
 * - All function arguments are automatically injected by the store during field validation.
 * - Automatically applied to all required fields by the store.  
 *
 * @example
 * ```ts
 * // Example usage in repository:
 * repositoryFields.testField.validators = [isEmpty]
 * ```
 * 
 * @see BaseValidatorFn
 */
export const isEmpty = (store: BaseStore, value: any, id: string): ValidatorResponse => {
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

/**
 * Validates that a field is positive.
 *
 * @remarks
 * - All function arguments are automatically injected by the store during field validation.
 *
 * @example
 * ```ts
 * // Example usage in repository:
 * repositoryFields.testField.validators = [isPositive]
 * ```
 *  @see BaseValidatorFn
 */
export const isPositive = (store: BaseStore, value: any, id: string) => {
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

/**
 * Validates that a field is intager.
 *
 * @remarks
 * All function arguments are automatically injected by the store during field validation.
 *
 * @example
 * ```ts
 * // Example usage in repository:
 * repositoryFields.testField.validators = [isIntager]
 * ```
 * 
 *  @see BaseValidatorFn
 */
export const isInteger = (store: BaseStore, value: any, id: string) => {
    const numericValue = Number(value);
    const isValid = !isNaN(numericValue) && Number.isInteger(numericValue);

    return {
        isValid: isValid,
        isWarning: false,
        message: text.errorMessages.isInteger,
    }
}

/**
 * Validates that a field is number.
 *
 * @remarks
 * - All function arguments are automatically injected by the store during field validation.
 *
 * @example
 * ```ts
 * // Example usage in repository:
 * repositoryFields.testField.validators = [isNumber]
 * ```
 * 
 *  @see BaseValidatorFn
 */
export const isNumber = (store: BaseStore, value: any, id: string) => {
    const numericValue = Number(value);

    return {
        isValid: !Number.isNaN(numericValue),
        isWarning: false,
        message: text.errorMessages.isNumber,
    }
}

/**
 * Validates that a field is greater then zero.
 *
 * @remarks
 * - All function arguments are automatically injected by the store during field validation.
 *
 * @example
 * ```ts
 * // Example usage in repository:
 * repositoryFields.testField.validators = [isGreaterThenZero]
 * ```
 * 
 *  @see BaseValidatorFn
 */
export const isGreaterThenZero = (store: BaseStore, value: any, id: string) => {
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
