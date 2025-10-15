import {BaseStore} from "@core/stores/base-store";

/**
 * Represents a field operation function executed when a field’s value changes.
 *
 * @remarks
 * All function arguments are automatically injected by the store during field updates.  
 * Operations may be triggered multiple times, so avoid performing heavy computations inside them.
 * 
 * @example
 *  ```ts
 * // Example usage in field repository:
 *  repositoryFields.testField.operations = [
 *      exampleOperation()
 *  ]
 * ```
 * 
 * @param {any} target - The target value or field affected by the operation.
 * @param {BaseStore} store - The store instance that triggered the operation.
 * @param {any} [value] - Optional value passed to the operation.
 *
 * @returns Either nothing (`void`) or a `Promise<void>` for asynchronous operations.
 */
export type BaseOperationFn = (target: any, store: BaseStore, value?: any,) => void | Promise<void>;

export const toggleRendering = (targetIds: string[], store: BaseStore, value: any): BaseOperationFn => {
    return () => {
        targetIds.forEach((id) => {
            const field = store.fields[id];
            if (!field) return;

            field.render = !field.render;
        })
    }
}

export const setFieldValue = (targetId: string, store: BaseStore, value: any): BaseOperationFn => {
    return () => {
        store.setFieldValue(targetId, value);
    }
}