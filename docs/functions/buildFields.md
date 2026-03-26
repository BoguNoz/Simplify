[**Simplify**](../README.md)

***

[Simplify](../README.md) / buildFields

# Function: buildFields()

> **buildFields**\<`T`\>(`configs`): `BaseFieldModel`[]

Defined in: [src/lib/base-model-utils.ts:112](https://github.com/BoguNoz/Simplify/blob/f26a848e000bf8e5948c0948c0a07286ae4b8d74/src/lib/base-model-utils.ts#L112)

Converts a configuration map into an array of `BaseFieldModel` objects.

## Type Parameters

### T

`T` *extends* `string`

Field keys (string literal union).

## Parameters

### configs

`Record`\<`T`, `Partial`\<`BaseFieldModel`\>\>

A map of partial or full `BaseFieldModel` configurations.

## Returns

`BaseFieldModel`[]

An array of `BaseFieldModel` instances.

## Remarks

This function is typically used after `createFieldPlaceholders()` to transform the
configuration dictionary into a list of fully usable field models.

This array is usually passed to:
- a **form store**,
- or directly into UI rendering logic.

Note: This function does not clone or validate the objects — it simply unwraps them.

## Example

```ts
const fields = buildFields(placeholders);

formStore.registerFields(fields);
```

## See

createFieldPlaceholders
