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
            size: 1,
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

/**
 * Returns the base width and height percentages for a composite layout mode.
 *
 * @remarks
 * Each mode defines a preset layout footprint expressed as `[width%, height%]`.
 * These values represent how much of the available viewport space the composite
 * should occupy before any additional scaling (e.g., via the `size` factor).
 *
 * Layout modes:
 * - `"vertical-window"` – Tall and narrow layout (50% width × 90% height)
 * - `"square-window"` – Balanced, square-like layout (80% × 80%)
 * - `"horizontal-window"` – Wide and shorter layout (90% × 60%)
 * - *default* – Full-size layout (100% × 100%)
 *
 * The returned percentages are intended to be multiplied by viewport dimensions
 * to compute actual pixel sizes.
 *
 * @param mode - The composite's layout mode.
 * @returns A tuple `[widthPercentage, heightPercentage]`.
 *
 * @example
 * modeToPercentage("square-window"); // [80, 80]
 * modeToPercentage("unknown");       // [100, 100]
 */
export const modeToPercentage = (mode: string) => {
    switch (mode) {
        case "vertical-window": return [50, 90];
        case "square-window": return [80, 80];
        case "horizontal-window": return [90, 60];
        default: return [100, 100];
    }
};