[**Simplify**](../README.md)

***

[Simplify](../README.md) / buildComposites

# Function: buildComposites()

> **buildComposites**\<`T`\>(`configs`): `BaseCompositeModel`[]

Defined in: [src/lib/base-composite-model-utils.ts:83](https://github.com/BoguNoz/Simplify/blob/8927a5f295da2866c60fb7ecc046fc43733fcfc9/src/lib/base-composite-model-utils.ts#L83)

Converts a composite configuration map into an array of `BaseCompositeModel` objects.

## Type Parameters

### T

`T` *extends* `string`

Composite keys (string literal union).

## Parameters

### configs

`Record`\<`T`, `Partial`\<`BaseCompositeModel`\>\>

A map of partial or complete composite definitions.

## Returns

`BaseCompositeModel`[]

An array of `BaseCompositeModel` instances.

## Remarks

This function is commonly used after `createCompositesPlaceholders()` to finalize a list
of composites and feed them into the composite store or rendering engine.

It does not validate or clone the objects — it simply unwraps the record into an array.

## Example

```ts
const composites = buildComposites(placeholders);

compositeStore.registerComposites(composites);
```

## See

createCompositesPlaceholders
