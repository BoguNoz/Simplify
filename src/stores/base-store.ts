import BaseFieldModel from "@core/models/base-field-model";
import {BaseOperationFn} from "@core/events/operation";
import {reaction, runInAction} from "mobx";
import {BaseValidatorFn, ValidatorResponse} from "@core/events/validator";
import {BaseDependencyFn} from "@core/events/dependency";
import {isNullEmptyFalseOrUndefined} from "@core/lib/utils";
import BaseFieldTypesEnum from "@core/enums/base-field-type-enum";

/**
 * The BaseStore implements a reactive signal-like mechanism using MobX observables and reactions. 
 * Each field acts as a signal source, and changes automatically propagate through defined dependencies and operations.
 */
export class BaseStore {
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

            if (field.validatorsFn?.length) {
                this.addValidators(field.id, field.validatorsFn);
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
     * @returns {Promise<any>} A promise resolving to the field's data source value,
     */
    getDataSource = async (id: string): Promise<any> => await this.fields[id].dataSource();

    /**
     * 
     * @param id 
     * @returns 
     */
    invokeDeconstructor = async (id: string) => await this.fields[id].deconstructor();

    getFieldValue = (id: string): any => this.fields[id]?.value;

    setFieldValue = async (id: string, value: any): Promise<void> => {
        const field = this.fields[id];

        runInAction(() => {
            field.value = value;
        });

        const ops = this.operations[id] || [];

        for (const fn of ops) {
            const result = fn(value, this);
            if (result instanceof Promise) {
                await result;
            }
        }
    };

    setFieldAdditValue = (id: string, addit: string, value: any): void => {
        const field = this.fields[id];

        if (field.addit) {
            field.addit[addit] = value;
        }
    }

    setFieldState = (id: string, error: boolean = false, processing: boolean = false): void => {
        const field = this.fields[id];
        field.state = {
            error: error,
            processing: processing,
        }
    }

    setFiledEditability = (id: string, isEditable: boolean): void => {
        const field = this.fields[id];
        field.isDisabled = !isEditable;
    }

    addValidators = (id: string, validators: BaseValidatorFn[]): void => {
        const field = this.fields[id];

        const newValidators = validators.filter(v =>
            !field.validatorsFn?.includes(v)
        );

        field.validatorsFn = [...(field.validatorsFn || []), ...newValidators];
    };

    validateField = (id: string): ValidatorResponse[] => {
        const field = this.fields[id];

        if (field.isDisabled || !field.render) return [{ isValid: true, isWarning: false, message: "" }] as ValidatorResponse[];

        const results = [];
        for (const fn of field.validatorsFn) {
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