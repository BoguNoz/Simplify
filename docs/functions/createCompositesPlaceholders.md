[**Simplify**](../README.md)

***

[Simplify](../README.md) / createCompositesPlaceholders

# Function: createCompositesPlaceholders()

> **createCompositesPlaceholders**\<`T`, `M`\>(`registeredFields`): `Record`\<`T`, `Partial`\<`BaseCompositeModel`\>\>

Defined in: [src/lib/base-composite-model-utils.ts:36](https://github.com/BoguNoz/Simplify/blob/8927a5f295da2866c60fb7ecc046fc43733fcfc9/src/lib/base-composite-model-utils.ts#L36)

Creates placeholder composite configurations based on a registry of composite identifiers.

## Type Parameters

### T

`T` *extends* `string`

Union of composite keys (string literal types).

### M

`M` *extends* `KeyMirror`\<`T`\>

Key–mirror structure `{ KEY: "KEY" }` describing registered composites.

## Parameters

### registeredFields

`M`

A key–mirror map of composite identifiers.

## Returns

`Record`\<`T`, `Partial`\<`BaseCompositeModel`\>\>

A record mapping composite keys to partial `BaseCompositeModel` definitions.

## Remarks

This function produces minimal definitions of `BaseCompositeModel`, used primarily during
application bootstrap or when constructing a composite repository.

These placeholders allow developers to define composite templates declaratively rather than
constructing full objects manually.

## Example

```ts
const registered = {
  userProfile: "userProfile",
  addressBlock: "addressBlock",
} as const;

const placeholders = createCompositesPlaceholders(registered);
```

## See

BaseCompositeModel
