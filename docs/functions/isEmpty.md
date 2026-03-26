[**Simplify**](../README.md)

***

[Simplify](../README.md) / isEmpty

# Function: isEmpty()

> **isEmpty**(`store`, `value`, `id`): [`ValidatorResponse`](../type-aliases/ValidatorResponse.md)

Defined in: [src/events/validator.ts:75](https://github.com/BoguNoz/Simplify/blob/f26a848e000bf8e5948c0948c0a07286ae4b8d74/src/events/validator.ts#L75)

Validates that a field is not empty.

## Parameters

### store

[`BaseStore`](../classes/BaseStore.md)

### value

`any`

### id

`string`

## Returns

[`ValidatorResponse`](../type-aliases/ValidatorResponse.md)

## Remarks

- All function arguments are automatically injected by the store during field validation.
- Automatically applied to all required fields by the store.

## Example

```ts
// Example usage in repository:
repositoryFields.testField.validators = [isEmpty]
```

## See

BaseValidatorFn
