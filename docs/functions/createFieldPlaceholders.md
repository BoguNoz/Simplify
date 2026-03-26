[**Simplify**](../README.md)

***

[Simplify](../README.md) / createFieldPlaceholders

# Function: createFieldPlaceholders()

> **createFieldPlaceholders**\<`T`, `M`, `L`\>(`registeredFields`, `translations`): `Record`\<`T`, `Partial`\<`BaseFieldModel`\>\>

Defined in: [src/lib/base-model-utils.ts:42](https://github.com/BoguNoz/Simplify/blob/f26a848e000bf8e5948c0948c0a07286ae4b8d74/src/lib/base-model-utils.ts#L42)

Creates placeholder field configurations for a set of registered fields.

## Type Parameters

### T

`T` *extends* `string`

Union of field keys (string literal types).

### M

`M` *extends* `KeyMirror`\<`T`\>

Mapped type representing a key–mirror structure `{ KEY: "KEY" }`.

### L

`L` *extends* `Record`\<`string`, `string`\>

Translation map providing label and description strings.

## Parameters

### registeredFields

`M`

A key–mirror object mapping field names to their identifiers.

### translations

`L`

A dictionary mapping `${fieldKey}Label` and `${fieldKey}Description` to strings.

## Returns

`Record`\<`T`, `Partial`\<`BaseFieldModel`\>\>

A map of partial `BaseFieldModel` definitions indexed by field keys.

## Remarks

This utility generates initial (default) field configurations based solely on:
- `registeredFields` — identifiers used inside forms/composites,
- `translations` — automatically mapping `{ fieldKey + "Label", fieldKey + "Description" }`.

Each generated field receives a default `BaseFieldModel` structure including:
- UI metadata (label, description, style, variant)
- validation & dependency containers
- default field state
- default `dataSource` and `deconstructor` handlers

This function is typically used when bootstrapping a form repository,
allowing developers to define fields declaratively instead of manually creating every model.

## Example

```ts
const placeholders = createFieldPlaceholders(registered, translations);
```

## See

BaseFieldModel
