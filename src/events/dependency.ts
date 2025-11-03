import {BaseStore} from "../stores/base-store";
import {isNullEmptyFalseOrUndefined} from "@core/lib/utils";

/**
 * Represents a dependency function that reacts to changes in a source (master) field.
 *
 * @param {string} target - The ID of the field affected by the dependency.
 * @param {string} master - The ID of the field that triggered the dependency.
 * @param {BaseStore} store - The store instance containing both fields.
 *
 * @remarks
 * - All function arguments are automatically injected by the store during dependency execution by default {@link updateDependents}.
 *
 * @example
 * ```ts
 * // Example usage in field repository:
 *  repositoryFields.testField.dependencies = [
 *      {fieldId: testRegisteredFields.targetId, events: [ifFieldEditability]},
 *  ]
 * ```
 *
 * @returns Either nothing (`void`) or a `Promise<void>` for asynchronous operations.
 *
 * @see BaseStore
 */
export type BaseDependencyFn = (target: string, master: string, store: BaseStore) => void | Promise<void>;

/**
 * Disables the target field when the master field’s value is null, empty, false, or undefined.
 *
 * @example
 * ```ts
 * // Example usage in field repository:
 *  repositoryFields.testField.dependencies = [
 *      {fieldId: testRegisteredFields.targetId, events: [ifFieldEditability]},
 *  ]
 * ```
 *
 * @remarks
 * - Commonly used to control editability based on another field’s state.
 * - All function arguments are automatically injected by the store.
 * 
 * @see BaseDependencyFn 
 */
export const ifFieldEditability = async (target: string, master: string, store: BaseStore): Promise<void> => {
    const field = store.fields[target];
    const value = store.getFieldValue(master);

    field.isDisabled = isNullEmptyFalseOrUndefined(value);
}


/**
 * Enables the target field only when the master field’s value is null, empty, false, or undefined.
 *
 * @example
 * ```ts
 * // Example usage in field repository:
 *  repositoryFields.testField.dependencies = [
 *      {fieldId: testRegisteredFields.targetId, events: [ifFieldNoEditability]},
 *  ]
 * ```
 *
 * @remarks
 * - Inverse behavior of {@link ifFieldEditability}.
 * - All function arguments are automatically injected by the store.
 * 
 * @see BaseDependencyFn
 */
export const ifFieldNoEditability = async (target: string, master: string, store: BaseStore): Promise<void> => {
    const field = store.fields[target];
    const value = store.getFieldValue(master);

    field.isDisabled = !isNullEmptyFalseOrUndefined(value);
}

/**
 * Marks the target field as required when the master field’s value is not null, empty, false, or undefined.
 *
 * @example
 * ```ts
 * // Example usage in field repository:
 *  repositoryFields.testField.dependencies = [
 *      {fieldId: testRegisteredFields.targetId, events: [ifFieldRequire]},
 *  ]
 * ```
 *
 * @remarks
 * - Typically used to enforce conditional validation requirements.
 * - All function arguments are automatically injected by the store.
 * 
 * @see BaseDependencyFn
 */
export const ifFieldRequire = async (target: string, master: string, store: BaseStore): Promise<void> => {
    const field = store.fields[target];
    const value = store.getFieldValue(master);

    field.isRequired = !isNullEmptyFalseOrUndefined(value);
}

/**
 * Controls the visibility (rendering) of the target field based on the master field’s value.
 *
 * @example
 * ```ts
 * // Example usage in field repository:
 *  repositoryFields.testField.dependencies = [
 *      {fieldId: testRegisteredFields.targetId, events: [ifFieldRender]},
 *  ]
 * ```
 *
 * @remarks
 * - The field will be rendered only if the master field’s value is not null, empty, false, or undefined.
 * - All function arguments are automatically injected by the store.
 * 
 * @see BaseDependencyFn
 */
export const ifFieldRender = async (target: string, master: string, store: BaseStore): Promise<void> => {
    const field = store.fields[target];
    const value = store.getFieldValue(master);

    field.render = !isNullEmptyFalseOrUndefined(value);
}
