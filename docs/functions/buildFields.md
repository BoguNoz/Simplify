[**Simplify**](../README.md)

***

[Simplify](../README.md) / buildFields

# Function: buildFields()

> **buildFields**\<`T`\>(`configs`): [`BaseFieldModel`](../interfaces/BaseFieldModel.md)[]

Defined in: [src/lib/base-model-utils.ts:109](https://github.com/BoguNoz/Simplify/blob/8927a5f295da2866c60fb7ecc046fc43733fcfc9/src/lib/base-model-utils.ts#L109)

Converts a configuration map into an array of `BaseFieldModel` objects.

## Type Parameters

### T

`T` *extends* `string`

Field keys (string literal union).

## Parameters

### configs

`Record`\<`T`, `Partial`\<[`BaseFieldModel`](../interfaces/BaseFieldModel.md)\>\>

A map of partial or full `BaseFieldModel` configurations.

## Returns

[`BaseFieldModel`](../interfaces/BaseFieldModel.md)[]

An array of `BaseFieldModel` instances.

## Remarks

This function is typically used after `createFieldPlaceholders()` to transform the
configuration dictionary into a list of fully usable field models.

This array is usually passed to:
- a **partials store**,
- or directly into UI rendering logic.

Note: This function does not clone or validate the objects — it simply unwraps them.

## Example

```ts
const fields = buildFields(placeholders);

formStore.registerFields(fields);
```

## See

createFieldPlaceholders
