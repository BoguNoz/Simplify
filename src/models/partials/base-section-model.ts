import {BaseFieldModel} from "@core/models";

/**
 * Represents a logical or visual section of a composite.
 * 
 * @remarks
 * Sections help organize complex composites by grouping related fields together.  
 * They can be used for UI rendering (e.g., tabs, accordions, grouped forms)
 * or simply to improve logical structure and configuration readability.
 */
export interface BaseSectionModel {
    /**
     * The section type.
     */
    type: string;

    /**
     * A list of field configurations that belong to this composite section.
     *
     * @remarks
     * Each field is initialized and managed through the composite's associated {@link BaseStore}.
     */
    fields: BaseFieldModel[];

    /**
     * The display label of the section, used for UI representation.
     */
    title?: string;

    /**
     * A short description of the section, explaining its purpose or contents.
     */
    description?: string;

    /**
     *  Disable section
     */
    disable?: boolean;
}
