import {BaseDependencyFn} from "@core/events/dependency";

/**
 * Represents a dependency relationship between fields.
 *
 * @remarks
 * Dependencies define which fields react to changes in other fields,
 * and specify which {@link BaseDependencyFn} functions should be triggered.
 * BaseDependencyFn has its arguments automatically injected by the store when the function is coled.
 */
export interface BaseDependencyModel {
    /**
     * The identifier of the field that this dependency listens to.
     *
     * @remarks
     * When the value of this field changes, all associated dependency functions are executed.
     */
    fieldId: string;

    /**
     * A list of dependency handler functions associated with this dependency.
     *
     * @remarks
     * Each {@link BaseDependencyFn} defines a specific reaction or side effect
     * that occurs when the source field’s value changes.
     */
    events: BaseDependencyFn[];
}