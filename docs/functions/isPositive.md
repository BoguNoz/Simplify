[**Simplify**](../README.md)

***

[Simplify](../README.md) / isPositive

# Function: isPositive()

> **isPositive**(`store`, `value`, `id`): `object`

Defined in: [src/events/validator.ts:96](https://github.com/BoguNoz/Simplify/blob/f26a848e000bf8e5948c0948c0a07286ae4b8d74/src/events/validator.ts#L96)

Validates that a field is positive.

## Parameters

### store

[`BaseStore`](../classes/BaseStore.md)

### value

`any`

### id

`string`

## Returns

`object`

### isValid

> **isValid**: `boolean` = `true`

### isWarning

> **isWarning**: `boolean` = `false`

### message

> **message**: `string` = `""`

## Remarks

- All function arguments are automatically injected by the store during field validation.

## Example

```ts
// Example usage in repository:
repositoryFields.testField.validators = [isPositive]
```

## See

BaseValidatorFn
