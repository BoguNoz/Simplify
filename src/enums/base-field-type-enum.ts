enum BaseFieldTypesEnum {
    CheckBox,
    Input,
    FileInput,
    Switch,
    Select,
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
     * // ... rest of base field configuration
     * ```
     *
     * @remarks
     * This field type does not use `state` or `placeholder` parameters.
     *
     * @see BaseButtonWithConfirmationProps
     * @see createFieldPlaceholders
     */
    ButtonWithConfirmation,
    Toggle,

    LineChart,
    BarChart,
    PieChart,
    HeatmapChart,
    Tile,
    MultiLineTimeChart,
}

export default BaseFieldTypesEnum;
