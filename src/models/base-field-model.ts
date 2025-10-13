import {BaseDependencyModel} from "@core/models/base-dependency-model";
import BaseFieldTypesEnum from "@core/enums/base-field-type-enum";
import {BaseValidatorFn} from "@core/events/validator";
import {BaseOperationFn} from "@core/events/operation";

/**
 * Represents a single reactive field within the store.
 *
 * @remarks
 * Each field contains metadata, state information, and logic hooks such as
 * validators, operations, and dependencies. The field also supports reactive
 * behavior through MobX observables, allowing changes to propagate automatically.
 *
 */
export default interface BaseFieldModel {
    /**
     * Unique field identifier.
     */
    id: string;

    /**
     * Defines the field type (e.g. input, select, checkbox, etc.).
     */
    fieldType: BaseFieldTypesEnum;

    /**
     * Current value of the field.
     */
    value: any;

    /**
     * Represents the field's current processing and validation state.
     */
    state: {
        /** Whether the field is currently in an error state. */
        error: boolean;

        /** Whether the field is currently processing an async operation. */
        processing: boolean;
    }

    /**
     * Indicates whether the field is disabled (non-editable).
     *
     * @remarks
     * Disabled fields are not validated for their values by default.
     */
    isDisabled: boolean;

    /**
     * Indicates whether the field is required.
     *
     * @remarks
     * Required fields automatically receive the isEmpty validator during initialization by the store.
     */
    isRequired: boolean;

    /**
     * Determines whether the field should be rendered in the UI.
     *
     * @remarks
     * Not render fields are not validated for their values by default.
     */
    render: boolean;

    /**
     * Field label displayed in the UI.
     */
    label: string;

    /**
     * Additional description text.
     */
    description: string;

    /**
     * Placeholder text shown when the field is empty.
     *
     * @remarks
     * Implemented by Input type fields.
     */
    placeholder: string;

    /**
     * Custom CSS style or class applied to the field.
     */
    style: string;

    /**
     * Visual variant or theme configuration for the field.
     *
     * @remarks
     * Typically used to control the appearance of base components, e.g., variants in shadcn/ui.
     */
    variant: any;

    /**
     * List of validator functions executed when validating the field.
     *
     * @remarks
     * Validators may be called multiple times, so they should perform only lightweight operations.
     * For more complex logic or side effects, use operation functions instead.
     */
    validatorsFn: BaseValidatorFn[];

    /**
     * List of operation functions executed when the field value changes.
     *
     * @remarks
     * For performance reasons, ensure that operations do not perform complex computations unnecessarily.
     */
    operations?: BaseOperationFn[];

    /**
     * List of dependencies defining relationships between fields.
     *
     * @remarks
     * Each {@link BaseDependencyFn} has its arguments automatically injected by the store when the function is coled.
     */
    dependencies: BaseDependencyModel[];

    /**
     * Function that provides the initial data for the field.
     *
     * @remarks
     * Data source functions are called without arguments by default during initialization.
     * Ensure that if your function accepts optional arguments, it returns `null` when arguments are not provided.
     * To call a data source function after initialization with specific arguments, use {@link getDataSource}.
     *
     * @returns The result of the data source function, optionally as a Promise.
     */
    dataSource: (...args: any[]) => any;

    /**
     * Cleanup function that executes when the field is destroyed or unmounted.
     *
     * @remarks
     * To call a deconstructor function use {@link invokeDeconstructor}.
     *
     */
    deconstructor: (...args: any[]) => void;

    /**
     * Additional dynamic properties assigned to the field.
     */
    addit: { [key: string]: any } | null;
}

