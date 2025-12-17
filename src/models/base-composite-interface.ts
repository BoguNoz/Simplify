import {BaseCompositeStore} from "@core/stores/base-composite-store";
import {BaseStore} from "@core/stores/base-store";

export interface BaseCompositeInterface {
    /**
     * The composite identifier used to load configuration
     * from {@link BaseCompositeStore.composites}.
     */
    compositeId: string;

    /**
     * Store holding composites and shared layout utilities.
     * Provides metadata such as dimensions and section structure.
     */
    compositeStore: BaseCompositeStore;

    /**
     * The data store backing the fields inside the form.
     * Field values, validation states and actions are retrieved from here.
     */
    store: BaseStore;

    /**
     * Optional blur handler for form fields.
     * Useful for adding extra behaviour to the field.
     */
    handleBlur?: (fieldId: string) => void;

    /**
     * Optional change handler allowing you to intercept field changes.
     * Useful for adding extra behaviour to the field.
     */
    handleChange?: (fieldId: string, value: any) => void;
}