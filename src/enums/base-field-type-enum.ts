enum BaseFieldTypesEnum {
    
    /**
     * A simple button component that displays the current state of the operation assigned to it.
     *
     * @remarks
     * The button automatically reflects the processing or error state of the associated field.
     * 
     * @see createFieldPlaceholders
     */
    Button,
    
    /**
     * Button that requires user confirmation before executing an action.
     *
     * @example
     * ```ts
     * // Example usage in field repository:
     * repositoryFields.confButton.fieldType = CardFieldTypesEnum.ButtonWithConfirmation;
     * repositoryFields.confButton.addit!.timeout = 1000;
     * repositoryFields.confButton.addit!.infoDescription = "Are you absolutely sure?";
     * repositoryFields.confButton.addit!.confirmButtonLabel = "Yes";
     * repositoryFields.confButton.addit!.declineButtonLabel = "No";
     * repositoryFields.confButton.addit!.field.addit!.handleConfirm = () => {}
     * // ... rest of base field configuration
     * ```
     *
     * @remarks
     * This field type does not use `state` parameter.
     *
     * @see BaseButtonWithConfirmationProps
     * @see createFieldPlaceholders
     */
    ButtonWithConfirmation,

    /**
     * A simple checkbox component.
     *
     * @see createFieldPlaceholders
     */
    CheckBox,

    /**
     * A simple file input field, that allows for file input from the user.
     * 
     * @see createFieldPlaceholders
     */
    FileInput,

    /**
     * A simple input field, that allows for text inut from the user.
     * 
     * @example
     * ```ts
     * // Example usage in repository
     * repositoryFields.input.addit.placholder = "example"
     * // ... rest of base field configuration
     * 
     * ```
     * 
     * @see createFieldPlaceholders
     */
    Input,

    /**
     * A simple dropdown field that allows the user to select one of the available options.
     *
     * @remarks
     * This field requires a `dataSource` function that returns a `Record<string, string>` representing
     * the selectable options. The keys are the option values, and the values are the display labels.
     *
     * @see createFieldPlaceholders
     */
    Select,

    /**
     * A simple switch field that allows toggling between two states (on/off).
     * 
     * @see createFieldPlaceholders
     */
    Switch,

    /**
     * A toggle field that allows switching between two states (on/off) with a visual toggle control.
     * 
     * @see createFieldPlaceholders
     */
    Toggle,

    LineChart,
    BarChart,
    PieChart,
    HeatmapChart,
    Tile,
    MultiLineTimeChart,
}

export default BaseFieldTypesEnum;
