[**Simplify**](../README.md)

***

[Simplify](../README.md) / isEmpty

# Function: isEmpty()

> **isEmpty**(`store`, `value`, `id`): [`ValidatorResponse`](../type-aliases/ValidatorResponse.md)

Defined in: [src/events/validator.ts:75](https://github.com/BoguNoz/Simplify/blob/8927a5f295da2866c60fb7ecc046fc43733fcfc9/src/events/validator.ts#L75)

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
