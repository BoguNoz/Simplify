import BaseCompositeModel from "../base-composite-model.ts";

type KeyMirror<T extends string> = {
    [K in T]: K;
};

export function createCompositesPlaceholders<
    T extends string,
    M extends KeyMirror<T>,
>(
    registeredFields: M,
): Record<T, Partial<BaseCompositeModel>> {
    return (Object.keys(registeredFields) as T[]).reduce((acc, key) => {

        acc[key] = {
            id: registeredFields[key],
            renderFn: undefined,
            render: false,
            fields: [],
        };

        return acc;
    }, {} as Record<T, Partial<BaseCompositeModel>>);
}

export function buildComposites<T extends string>(
    configs: Record<T, Partial<BaseCompositeModel>>
): BaseCompositeModel[] {
    return Object.values(configs) as BaseCompositeModel[];
}
