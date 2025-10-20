import BaseFieldModel from "@core/models/base-field-model";
import {BaseOperationFn} from "@core/events/operation";
import {reaction, runInAction} from "mobx";
import {BaseValidatorFn, ValidatorResponse} from "@core/events/validator";
import {BaseDependencyFn} from "@core/events/dependency";
import {isNullEmptyFalseOrUndefined, isNullOrUndefined} from "@core/lib/utils";
import BaseFieldTypesEnum from "@core/enums/base-field-type-enum";

/**
 * Abstract base class that provides a reactive, signal-like state management layer using MobX.
 *
 * @remarks
 * Each field within the store acts as a reactive signal source.
 * When a field's value changes, all related operations and dependency functions are automatically triggered.
 * This enables dynamic form behavior, field validation, and dependency propagation with minimal boilerplate.
 *
 * The class serves as the foundation for custom store implementations handling form state,
 * validation, data sources, and inter-field logic.
 *
 * @example
 * ```ts
 * // Example base implementation:
 * class FieldStore extends BaseStore {
 *     override fields: Record<string, BaseFieldModel> = {};
 *     override operations: Record<string, BaseOperationFn[]> = {};
 *
 *     constructor() {
 *         super();
 *
 *         makeObservable(this, {
 *             fields: observable,
 *             operations: observable,
 *             reverseDeps: observable,
 *
 *             initializeFields: action,
 *             updateDependents: action,
 *             invokeDeconstructor: action,
 *             setFieldValue: action,
 *             setFieldAdditValue: action,
 *             setFieldState: action,
 *             addValidators: action,
 *             setFiledEditability: action,
 *         });
 *     }
 *§}
 * ```
 *
 * @abstract
 * @see BaseFieldModel
 * @see BaseDependencyFn
 * @see BaseValidatorFn
 * @see BaseOperationFn
 */
export abstract class BaseStore {
    fields: Record<string, BaseFieldModel> = {};
    operations: Record<string, BaseOperationFn[]> = {};
    reverseDeps: Record<string, Record<string, BaseDependencyFn[]>> = {};

    /**
     * Initializes all fields based on their configuration.
     * 
     * @remarks
     * Sets up field data sources, validators, operations, and dependencies.
     * Also registers reactions to automatically update dependent fields when values change.
     * 
     * @param {BaseFieldModel[]} fields - List of fields configurations.
     */
    initializeFields = async (fields: BaseFieldModel[]): Promise<void> => {
        for (const field of fields) {
            this.fields[field.id] = field;
            this.reverseDeps[field.id] = {};

            const value = await this.getDataSource(field.id);
            if (!isNullEmptyFalseOrUndefined(value) && field.fieldType != BaseFieldTypesEnum.Select) {
                this.fields[field.id].value = value;
            }

            if (field.validators?.length) {
                this.addValidators(field.id, field.validators);
            }
            if (field.operations?.length) {
                this.operations[field.id] = [...field.operations];
            }

            field.dependencies.forEach(f => {
                this.reverseDeps[f.fieldId][field.id] = f.events;
            });

        };

        Object.keys(this.fields).forEach(id => {
            reaction(
                () => this.fields[id].value,
                () => this.updateDependents(id)
            );
        });
    }

    /**
     * Invokes all dependency functions @type {BaseDependencyFn} subscribed to the changed field.
     * 
     * @remarks
     * Dependency functions are registered during field initialization and are triggered
     * whenever the corresponding field value changes.
     * All dependency function arguments are automatically injected.
     * 
     * @param {string} changedId - The ID of the field whose value has changed.
     */
    updateDependents = async (changedId: string): Promise<void> => {
        const dependents = this.reverseDeps[changedId] || [];

        Object.entries(dependents).forEach(([targetId, fns]) => {
            fns.forEach(fn => {
                fn(targetId, changedId, this);
            });
        });
    }

    /**
     * Retrives data from the data source function defined for a field.
     * 
     * @remarks
     * Executes the data source function assigned to the field and returns the resulting value.
     * 
     * @param {string} id - The ID of the field. 
     * @param {any[]} args - Data source function arguments.
     * 
     * @returns {Promise<any>} A promise resolving to the field's data source value.
     */
    getDataSource = async (id: string, ...args: any[]): Promise<any> => await this.fields[id].dataSource(...args);

   /**
     * Invokes the deconstructor function defined for the specified field.
     *
     * @remarks
     * This method executes the field’s custom `deconstructor` function, allowing cleanup
     * or resource release related to the field.
     * 
     * Use this method carefully — deconstructors should only be called when the field
     * is being permanently disposed or reset.
     *
     * If the `free` parameter is set to `true`, the field will also be removed
     * from the store after its deconstructor is executed.
     *
     * @param {string} id - The ID of the field to deconstruct.
     * @param {boolean} free - Whether the field should be removed from the store after deconstruction.
     * @param {...any[]} args - Optional arguments passed to the deconstructor function.
     */
    invokeDeconstructor = async (id: string, free: boolean, ...args: any[]): Promise<void> => {
        if (!Object.hasOwn(this.fields, id)){
            return;
        }

        await this.fields[id].deconstructor(...args);
        if (free) {
            delete this.fields[id];
        }   
    }


    /**
     * Returns the current value of a field.
     * 
     * @param id - The ID of the field.
     * 
     * @returns {any} The field's current assigned value. 
     */
    getFieldValue = (id: string): any => this.fields[id]?.value;

    /**
     * Sets a field's value and executes all associated functions.
     * 
     * @remarks
     * The setter also invokes asynchronous operations associated with the field.
     * Use `await` when calling this method if subsequent logic depends on thier completion.
     * 
     * @param id - The ID of the field.
     * @param value - The new value to assign.
     */
    setFieldValue = async (id: string, value: any): Promise<void> => {
        const field = this.fields[id];

        runInAction(() => {
            field.value = value;
        });

        const ops = this.operations[id] || [];

        for (const fn of ops) {
            const result = fn();
            if (result instanceof Promise) {
                await result;
            }
        }
    };

    /**
     * Sets an additional (auxiliary) value for a field.
     * 
     * @remarks
     * Safe way for setting additional value for a field.
     * 
     * @param {string} id - The ID of the field.
     * @param {string} addit - The name of the additional property.
     * @param {any} value - The value to assign.
     */
    setFieldAdditValue = (id: string, addit: string, value: any): void => {
        const field = this.fields[id];

        if (field.addit) {
            field.addit[addit] = value;
        }
    }

    /**
     * Updates the field's state flags such as `error` or `processing`.
     * 
     * @remarks
     * Calling this method without specifying flags will reset the field status to its default state.
     * 
     * @param {string} id - The ID of the field.
     * @param {boolean} [error=false] - Whether the field is in error state.
     * @param {boolean} [processing=false] - Whether the field is in processing state.
     */
    setFieldState = (id: string, error: boolean = false, processing: boolean = false): void => {
        const field = this.fields[id];
        field.state = {
            error: error,
            processing: processing,
        }
    }

    /**
     * Sets whether the field is editable or not.
     * 
     * @param {string} id - The ID of the field.
     * @param {boolean} isEditable - Whether the field is editable or not.
     */
    setFiledEditability = (id: string, isEditable: boolean): void => {
        const field = this.fields[id];
        field.isDisabled = !isEditable;
    }

    /**
     * Adds new validators to a field, avoiding duplicates.
     * 
     * @remarks
     * For safety reasons, avoid calling this method to dynamically alter validator list assigned to a field.
     * 
     * @param {string} id - The ID of the field.
     * @param {BaseValidatorFn[]} validators - The list of validator functions to add.
     */
    addValidators = (id: string, validators: BaseValidatorFn[]): void => {
        const field = this.fields[id];

        const newValidators = validators.filter(v =>
            !field.validators?.includes(v)
        );

        field.validators = [...(field.validators || []), ...newValidators];
    };

    /**
     * Runs validation for a specific field.
     *
     * @param {string} id - The ID of the field.
     *
     * @remarks
     * Validation will occur, when field is not disabled and render 
     * or value is not null or undefined.
     *
     * @returns {ValidatorResponse[]} The list of validation results.
     */
    validateField = (id: string): ValidatorResponse[] => {
        const field = this.fields[id];

        if (field.isDisabled || !field.render || isNullOrUndefined(field.value)) 
            return [{ isValid: true, isWarning: false, message: "" }] as ValidatorResponse[];

        const results = [];
        for (const fn of field.validators) {
            const result = fn(this, field.value, id);
            if (!result.isValid) {
                results.push(result);
            }
        }

        if (results.length > 0) {
            return results;
        }
        return [{ isValid: true, isWarning: false, message: "" }] as ValidatorResponse[];
    };

    /** Validates a specific list of fields.
    *
    * @param {string[]} ids - The IDs of the fields to validate.
     *
    * @returns {Promise<boolean>} True if all fields are valid, otherwise false.
    */
    validateSpecifyFields = async (ids: string[]): Promise<boolean> => {
        let result = true
        for (const id of ids) {
            const validationResult = this.validateField(id);
            if (validationResult.some(v => !v.isValid && !v.isWarning)) {
                result = false;
            }
        }

        return result;
    }
}