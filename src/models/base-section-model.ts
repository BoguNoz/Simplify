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
     * The unique identifier of the section.
     */
    id: string;

    /**
     * A list of field IDs that belong to this section.
     */
    fieldsIds: string[];

    /**
     * The display label of the section, used for UI representation.
     */
    label: string;

    /**
     * A short description of the section, explaining its purpose or contents.
     */
    description: string;
}
