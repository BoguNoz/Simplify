import {BaseStore} from "@core/stores/base-store";

/**
 * Represents a field operation function executed when a field’s value changes.
 *
 * @remarks
 * Operations may be triggered multiple times, so avoid performing heavy computations inside them.
 * 
 * @example
 *  ```ts
 * // Example usage in field repository:
 *  repositoryFields.testField.operations = [
 *      exampleOperation(testRegisteredFields.targetId, fieldStore, "value"),
 *  ];
 * ```
 * 
 * @param {any} target - The target value or field affected by the operation.
 * @param {BaseStore} store - The store instance that triggered the operation.
 * @param {any} [value] - Optional value passed to the operation.
 *
 * @returns Either nothing (`void`) or a `Promise<void>` for asynchronous operations.
 *
 * @see BaseStore
 */
export type BaseOperationFn = (target?: any, store?: BaseStore, value?: any,) => void | Promise<void>;

/**
 * Toggles the visibility (`render` property) of one or more fields.
 *
 * @example
 * ```ts
 * // Example usage in field repository:
 *  repositoryFields.testField.operations = [
 *      exampleOperation([testRegisteredFields.targetId], fieldStore),
 *  ];
 * ``` 
 * 
 * @param {string[]} targetIds - The IDs of the fields whose visibility should be toggled.
 * @param {BaseStore} store - The store instance containing the target fields.
 *
 * @returns {BaseOperationFn} A function that performs the toggling operation.
 *
 * @see BaseOperationFn
 */
export const toggleRendering = (targetIds: string[], store: BaseStore, value: any): BaseOperationFn => {
    return () => {
        targetIds.forEach((id) => {
            const field = store.fields[id];
            if (!field) return;

            field.render = !field.render;
        })
    }
}

/**
 * Sets the value of a target field.
 *
 * @example
 * ```ts
 * // Example usage in field repository:
 *  repositoryFields.testField.operations = [
 *      exampleOperation(testRegisteredFields.targetId, fieldStore),
 *  ];
 * ``` 
 * 
 * @param {string[]} targetIds - The IDs of the fields whose visibility should be toggled.
 * @param {BaseStore} store - The store instance containing the target fields.
 *
 * @returns {BaseOperationFn} A function that performs the toggling operation.
 * 
 * @see BaseOperationFn
 */
export const setFieldValue = (targetId: string, store: BaseStore, value: any): BaseOperationFn => {
    return () => {
        store.setFieldValue(targetId, value);
    }
}