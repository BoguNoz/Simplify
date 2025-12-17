import BaseFieldModel from "../models/base-field-model";
import BaseFieldTypesEnum from "@core/enums/base-field-type-enum";


type KeyMirror<T extends string> = {
    [K in T]: K;
};

/**
 * Creates placeholder field configurations for a set of registered fields.
 *
 * @template T - Union of field keys (string literal types).
 * @template M - Mapped type representing a key–mirror structure `{ KEY: "KEY" }`.
 * @template L - Translation map providing label and description strings.
 *
 * @remarks
 * This utility generates initial (default) field configurations based solely on:
 * - `registeredFields` — identifiers used inside forms/composites,
 * - `translations` — automatically mapping `{ fieldKey + "Label", fieldKey + "Description" }`.
 *
 * Each generated field receives a default `BaseFieldModel` structure including:
 * - UI metadata (label, description, style, variant)
 * - validation & dependency containers
 * - default field state
 * - default `dataSource` and `deconstructor` handlers
 *
 * This function is typically used when bootstrapping a form repository,
 * allowing developers to define fields declaratively instead of manually creating every model.
 *
 * @param registeredFields - A key–mirror object mapping field names to their identifiers.
 * @param translations - A dictionary mapping `${fieldKey}Label` and `${fieldKey}Description` to strings.
 *
 * @returns A map of partial `BaseFieldModel` definitions indexed by field keys.
 *
 * @example
 * ```ts
 * const placeholders = createFieldPlaceholders(registered, translations);
 * ```
 *
 * @see BaseFieldModel
 */
export function createFieldPlaceholders<
    T extends string,
    M extends KeyMirror<T>,
    L extends Record<string, string>
>(
    registeredFields: M,
    translations: L
): Record<T, Partial<BaseFieldModel>> {
    return (Object.keys(registeredFields) as T[]).reduce((acc, key) => {
        const labelKey = `${key}Label`;
        const descriptionKey = `${key}Description`;

        acc[key] = {
            id: registeredFields[key],
            parentId: "",
            label: translations[labelKey] ?? "",
            description: translations[descriptionKey] ?? "",
            isDisabled: false,
            isRequired: false,
            render: true,
            excluded: false,
            fieldType: BaseFieldTypesEnum.Input,
            value: undefined,
            validators: [],
            operations: [],
            addit: {},
            dependencies: [],
            style: "",
            variant: "default",
            width: null,
            height: null,
            state: {
                status: "unknown",
                validationResult: [],
            },
            dataSource: () => undefined,
            deconstructor: () => {},
        };

        return acc;
    }, {} as Record<T, Partial<BaseFieldModel>>);
}

/**
 * Converts a configuration map into an array of `BaseFieldModel` objects.
 *
 * @template T - Field keys (string literal union).
 *
 * @remarks
 * This function is typically used after `createFieldPlaceholders()` to transform the
 * configuration dictionary into a list of fully usable field models.
 *
 * This array is usually passed to:
 * - a **form store**,
 * - or directly into UI rendering logic.
 *
 * Note: This function does not clone or validate the objects — it simply unwraps them.
 *
 * @param configs - A map of partial or full `BaseFieldModel` configurations.
 * @returns An array of `BaseFieldModel` instances.
 *
 * @example
 * ```ts
 * const fields = buildFields(placeholders);
 *
 * formStore.registerFields(fields);
 * ```
 *
 * @see createFieldPlaceholders
 */
export function buildFields<T extends string>(
    configs: Record<T, Partial<BaseFieldModel>>
): BaseFieldModel[] {
    return Object.values(configs) as BaseFieldModel[];
}