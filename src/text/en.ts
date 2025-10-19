export default {
    errorMessages: {
        isEmpty: "Field cannot be empty.",
        isPositive: "Field value must be a positive.",
        isInteger: "Field value must be a integer.",
        isGreaterThenZero: "Field value must be greater than zero.",
        isFileLoadError: "There was an error while loading file.",
        isWrongFileTypeError: "That file type isn't supported",
        isNumber: "Field value must be a number.",
    },
    toasters: {
        errorMessages: {
            saveToStorage: "Saving file failed.",
            loadFromStorage: "Loading file failed.",
            deleteFromStorage: "Can not delete file.",
        },
        successMessages: {
            saveToStorage: "Saving file succeeded.",
        },
    },
    mock: {
        baseButtonLabel: "Base Button",
        baseButtonDescription: "A reusable component that displays a button or a component that looks like a button.",

        baseButtonWithConfirmLabel: "Base Button with Confirm",
        baseButtonWithConfirmDescription: "A reusable button that requires user confirmation before executing an action. " +
            "Displays a confirmation dialog inline instead of immediately performing the action.",
        baseButtonWithConfirmInfoDescription: "Are you absolutely sure?",
        baseButtonWithConfirmConfirmButtonLabel: "Yes",
        baseButtonWithConfirmDeclineButtonLabel: "No",

        baseCheckboxLabel: "Base Checkbox",
        baseCheckboxDescription: "A reusable component that displays a checkbox. This control allows the user to toggle between checked and not checked state",

        baseFileInputLabel: "Base File Input",
        baseFileInputDescription: "A reusable component that displays file input. This control allows for file input from user.",

        baseInputLabel: "Base Input",
        baseInputDescription: "A reusable component that displays file input from user. This control allows for text input from user.",
        baseInputPlaceholder: "Placeholder",

        baseSelectorLabel: "Base Selector",
        baseSelectorDescription: "A reusable component that displays a list of options for the user to pick from—triggered by a button.",
        baseSelectorOptions: {
            spring: "Spring",
            summer: "Summer",
            autumn: "Autumn",
            winter: "Winter",
        },

        baseSwitchLabel: "Base Switch",
        baseSwitchDescription: "A reusable component that allows the user to toggle between checked and not checked",

        baseToggleLabel: "Base Toggle",
        baseToggleDescription: "A reusable two-state button that can be either on or off.",
    },
}