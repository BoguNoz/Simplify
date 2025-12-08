import BaseCompositeModel from "../base-composite-model";

type KeyMirror<T extends string> = {
    [K in T]: K;
};

/**
 * Creates placeholder composite configurations based on a registry of composite identifiers.
 *
 * @template T - Union of composite keys (string literal types).
 * @template M - Key–mirror structure `{ KEY: "KEY" }` describing registered composites.
 *
 * @remarks
 * This function produces minimal definitions of `BaseCompositeModel`, used primarily during
 * application bootstrap or when constructing a composite repository.
 *
 * These placeholders allow developers to define composite templates declaratively rather than
 * constructing full objects manually.
 *
 * @param registeredFields - A key–mirror map of composite identifiers.
 *
 * @returns A record mapping composite keys to partial `BaseCompositeModel` definitions.
 *
 * @example
 * ```ts
 * const registered = {
 *   userProfile: "userProfile",
 *   addressBlock: "addressBlock",
 * } as const;
 *
 * const placeholders = createCompositesPlaceholders(registered);
 * ```
 *
 * @see BaseCompositeModel
 */
export function createCompositesPlaceholders<
    T extends string,
    M extends KeyMirror<T>,
>(
    registeredFields: M,
): Record<T, Partial<BaseCompositeModel>> {
    return (Object.keys(registeredFields) as T[]).reduce((acc, key) => {

        acc[key] = {
            id: registeredFields[key],
            fields: [],
            sections: [],
            renderFn: undefined,
            render: false,
            mode: "page",
            size: "xl",
            deconstructor: () => {},
        };

        return acc;
    }, {} as Record<T, Partial<BaseCompositeModel>>);
}

/**
 * Converts a composite configuration map into an array of `BaseCompositeModel` objects.
 *
 * @template T - Composite keys (string literal union).
 *
 * @remarks
 * This function is commonly used after `createCompositesPlaceholders()` to finalize a list
 * of composites and feed them into the composite store or rendering engine.
 *
 * It does not validate or clone the objects — it simply unwraps the record into an array.
 *
 * @param configs - A map of partial or complete composite definitions.
 *
 * @returns An array of `BaseCompositeModel` instances.
 *
 * @example
 * ```ts
 * const composites = buildComposites(placeholders);
 * 
 * compositeStore.registerComposites(composites);
 * ```
 *
 * @see createCompositesPlaceholders
 */
export function buildComposites<T extends string>(
    configs: Record<T, Partial<BaseCompositeModel>>
): BaseCompositeModel[] {
    return Object.values(configs) as BaseCompositeModel[];
}

export const modeToPercentage = (mode: string) => {
    switch (mode) {
        case "vertical-window": return [60, 90];
        case "square-window": return [80, 80];
        case "horizontal-window": return [90, 60];
        default: return [100, 100];
    }
};

export const sizeToPercentage = (size: string) => {
    switch (size) {
        case "s": return 0.3;
        case "l": return 0.8;
        case "xl": return 1;
        default: return 0.5
    }
};