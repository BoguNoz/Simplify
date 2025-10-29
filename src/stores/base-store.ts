import BaseFieldModel from "@core/models/base-field-model";
import {BaseOperationFn} from "@core/events/operation";
import {reaction, runInAction} from "mobx";
import {BaseValidatorFn, isEmpty, ValidatorResponse} from "@core/events/validator";
import {BaseDependencyFn} from "@core/events/dependency";
import {isNullEmptyFalseOrUndefined, isNullOrUndefined} from "@core/lib/utils";
import BaseFieldTypesEnum from "@core/enums/base-field-type-enum";
import BaseFieldTypeEnum from "@core/enums/base-field-type-enum";
import {ChangeRegistry} from "@core/engine/change-registry";

/**
 * Abstract base class that provides a reactive, signal-like state management layer using MobX.
 *
 * @remarks
 * - Each field within the store acts as a reactive signal source.
 * When a field's value changes, all related operations and dependency functions are automatically triggered.
 * This enables dynamic form behavior, field validation, and dependency propagation with minimal boilerplate.
 *
 * - The class serves as the foundation for custom store implementations handling form state,
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
 *             invokeDeconstructor: action,
 *             setFieldValue: action,
 *             setFieldAdditValue: action,
 *             setFieldState: action,
 *             addValidators: action,
 *             setFiledEditability: action,
 *         });
 *     }
 *}
 *
 * export const fieldStore = new FieldStore();
 * ```
 * 
 * ```ts
 * // Example store initialization 
 * await fieldStore.initializeFields(fields);
 * ```
 *
 * @abstract
 * @see BaseStore.initializeFields
 * @see BaseStore.getDataSource
 * @see BaseStore.invokeDeconstructor
 * @see BaseStore.getFieldValue
 * @see BaseStore.setFieldValue
 * @see BaseStore.setFieldAdditValue
 * @see BaseStore.setFieldState
 * @see BaseStore.setFiledEditability
 * @see BaseStore.addValidators
 * @see BaseStore.validateField
 * @see BaseStore.validateSpecifyFields
 */
export abstract class BaseStore {
    fields: Record<string, BaseFieldModel> = {};
    operations: Record<string, BaseOperationFn[]> = {};
    reverseDeps: Record<string, Record<string, BaseDependencyFn[]>> = {};
    private readonly _registry: ChangeRegistry;

    constructor() {
        this._registry = new ChangeRegistry();
    }


    // #region Facade
    /**
     * Sets a field's value and executes all associated functions.
     *
     * @remarks
     * - The setter also invokes asynchronous operations associated with the field.
     * - Use `await` when calling this method if subsequent logic depends on their completion.
     * - To change behavior of this method override {@link _setFieldValue} private method
     *
     *
     * @param id - The ID of the field.
     * @param value - The new value to assign.
     *
     * @readonly
     */
    public readonly setFieldValue = (id: string, value: any) => {
        this._registry.registerChange(() => this._setFieldValue(id, value));
    }

    /**
     * Sets an additional (auxiliary) value for a field.
     *
     * @remarks
     * - Safe way for setting additional value for a field.
     * - To change behavior of this method override {@link _setFieldAdditValue} private method
     *
     * @param {string} id - The ID of the field.
     * @param {string} addit - The name of the additional property.
     * @param {any} value - The value to assign.
     *
     * @readonly
     */
    public readonly setFieldAdditValue = (id: string, addit: string, value: any): void => {
        this._registry.registerChange(() => this._setFieldAdditValue(id, addit, value));
    }

    /**
     * Updates the field's state flags such as `error` or `processing`.
     *
     * @remarks
     * - Calling this method without specifying flags will reset the field status to its default state.
     * - To change behavior of this method override {@link _setFieldState} private method
     *
     * @param {string} id - The ID of the field.
     * @param {boolean} [error=false] - Whether the field is in error state.
     * @param {boolean} [processing=false] - Whether the field is in processing state.
     *
     * @readonly
     */
    public readonly setFieldState = (id: string, error: boolean = false, processing: boolean = false): void => {
        this._registry.registerChange(() => this._setFieldState(id, error, processing));
    }

    /**
     * Sets whether the field is editable or not.
     *
     * @remarks
     * - To change behavior of this method override {@link _setFiledEditability} private method
     *
     * @param {string} id - The ID of the field.
     * @param {boolean} isEditable - Whether the field is editable or not.
     *
     * @readonly
     */
    public readonly setFiledEditability = (id: string, isEditable: boolean): void => {
        this._registry.registerChange(() => this._setFiledEditability(id, isEditable));
    }

    /**
     * Invokes the deconstructor function defined for the specified field.
     *
     * @remarks
     * - This method executes the field’s custom `deconstructor` function, allowing cleanup or resource release related to the field.
     * - Use this method carefully. Deconstructors should only be called when the field is being permanently disposed or reset.
     * - If the `free` parameter is set to `true`, the field will also be removed from the store after its deconstructor is executed.
     * - To change behavior of this method override {@link _invokeDeconstructor} private method
     *
     * @param {string} id - The ID of the field to deconstruct.
     * @param {boolean} free - Whether the field should be removed from the store after deconstruction.
     * @param {...any[]} args - Optional arguments passed to the deconstructor function.
     *
     * @readonly
     */
    public readonly invokeDeconstructor = async (id: string, free: boolean, ...args: any[]): Promise<void> => {
        this._registry.registerChange(() => this._invokeDeconstructor(id, free, ...args));
    }

    /**
     * Initializes all fields based on their configuration.
     *
     * @remarks
     * - Sets up field data sources, validators, operations, and dependencies.
     * - Registers reactions to automatically update dependent fields when values change.
     * - For required fields, an isEmpty validator is added automatically.
     * - Fields of type `Button`, `ButtonWithConfirmation`, and `Toggle` are their excluded flag set as `true` as default.
     *
     * @param {BaseFieldModel[]} fields - List of fields configurations.
     */
    public initializeFields = async (fields: BaseFieldModel[]): Promise<void> => {
        for (const field of fields) {
            this.fields[field.id] = field;
            this.reverseDeps[field.id] = {};

            const value = await this.getDataSource(field.id);
            if (!isNullEmptyFalseOrUndefined(value) && field.fieldType != BaseFieldTypesEnum.Select) {
                this.fields[field.id].value = value;
            }

            if (field.fieldType === BaseFieldTypeEnum.Button
                || field.fieldType ===  BaseFieldTypeEnum.ButtonWithConfirmation
                || field.fieldType === BaseFieldTypeEnum.Toggle
            ) {
                this.fields[field.id].excluded = true;
            }

            if (field.validators?.length) {
                this.addValidators(field.id, field.validators);
            }

            if (field.isRequired) {
                this.addValidators(field.id, [isEmpty]);
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
     * Runs validation for a specific field.
     *
     * @param {string} id - The ID of the field.
     *
     * @remarks
     * Validation will occur, when field is not disabled and render
     * or value is not null or undefined or field is not excluded.
     *
     * @returns {ValidatorResponse[]} The list of validation results.
     */
    public validateField = (id: string): ValidatorResponse[] => {
        const field = this.fields[id];

        if (field.isDisabled || !field.render || isNullOrUndefined(field.value) || field.excluded)
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
    public validateSpecifyFields = async (ids: string[]): Promise<boolean> => {
        let result = true
        for (const id of ids) {
            const validationResult = this.validateField(id);
            if (validationResult.some(v => !v.isValid && !v.isWarning)) {
                result = false;
            }
        }
        return result;
    }

    /**
     * Returns the current value of a field.
     *
     * @param id - The ID of the field.
     *
     * @returns {any} The field's current assigned value.
     */
    public getFieldValue = (id: string): any => this.fields[id]?.value;

    /**
     * Retrieves data from the data source function defined for a field.
     *
     * @remarks
     * Executes the data source function assigned to the field and returns the resulting value.
     *
     * @param {string} id - The ID of the field.
     * @param {any[]} args - Data source function arguments.
     *
     * @returns {Promise<any>} A promise resolving to the field's data source value.
     */
    public getDataSource = async (id: string, ...args: any[]): Promise<any> => await this.fields[id].dataSource(...args);

    /**
     * Adds new validators to a field, avoiding duplicates.
     *
     * @remarks
     * For safety reasons, avoid calling this method to dynamically alter validator list assigned to a field.
     *
     * @param {string} id - The ID of the field.
     * @param {BaseValidatorFn[]} validators - The list of validator functions to add.
     */
    public addValidators = (id: string, validators: BaseValidatorFn[]): void => {
        const field = this.fields[id];

        const newValidators = validators.filter(v =>
            !field.validators?.includes(v)
        );

        field.validators = [...(field.validators || []), ...newValidators];
    };

    /**
     * Invokes all dependency functions @type {BaseDependencyFn} subscribed to the changed field.
     *
     * @remarks
     * - Dependency functions are registered during field initialization and are triggered whenever the corresponding field value changes.
     * - All dependency function arguments are automatically injected.
     *
     * @param {string} changedId - The ID of the field whose value has changed.
     */
    public updateDependents = async (changedId: string): Promise<void> => {
        const dependents = this.reverseDeps[changedId] || [];

        Object.entries(dependents).forEach(([targetId, fns]) => {
            fns.forEach(fn => {
                fn(targetId, changedId, this);
            });
        });
    }
    // #endregion Facade


    // #region Logic
    private _setFieldValue = async (id: string, value: any): Promise<void> => {
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

    private _setFieldAdditValue = (id: string, addit: string, value: any): void => {
        const field = this.fields[id];

        if (field.addit) {
            field.addit[addit] = value;
        }
    }

    private _setFieldState = (id: string, error: boolean = false, processing: boolean = false): void => {
        const field = this.fields[id];
        field.state = {
            error: error,
            processing: processing,
        }
    }

    private _setFiledEditability = (id: string, isEditable: boolean): void => {
        const field = this.fields[id];
        field.isDisabled = !isEditable;
    }

    private _invokeDeconstructor = async (id: string, free: boolean, ...args: any[]): Promise<void> => {
        if (!Object.keys(this.fields).includes(id)) {
            return;
        }

        await this.fields[id].deconstructor(...args);
        if (free) {
            delete this.fields[id];
        }
    }
    // #endregion Logic
}