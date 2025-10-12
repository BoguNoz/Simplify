import BaseFieldModel from "../base-field-model";
import BaseFieldTypesEnum from "@core/enums/base-field-type-enum";


type KeyMirror<T extends string> = {
    [K in T]: K;
};

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
            label: translations[labelKey] ?? "",
            description: translations[descriptionKey] ?? "",
            isDisabled: false,
            isRequired: false,
            render: true,
            fieldType: BaseFieldTypesEnum.Input,
            value: "",
            validatorsFn: [],
            operations: [],
            addit: null,
            dependencies: [],
            placeholder: "",
            style: "",
            variant: "",
            state: {
                error: false,
                processing: false,
            },
            dataSource: () => "",
            deconstructor: () => {},
        };

        return acc;
    }, {} as Record<T, Partial<BaseFieldModel>>);
}

export function buildFields<T extends string>(
    configs: Record<T, Partial<BaseFieldModel>>
): BaseFieldModel[] {
    return Object.values(configs) as BaseFieldModel[];
}
