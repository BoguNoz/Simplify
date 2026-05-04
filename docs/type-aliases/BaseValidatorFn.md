[**Simplify**](../README.md)

***

[Simplify](../README.md) / BaseValidatorFn

# Type Alias: BaseValidatorFn

> **BaseValidatorFn** = (`store`, `value`, `id`) => [`ValidatorResponse`](ValidatorResponse.md)

Defined in: [src/events/validator.ts:58](https://github.com/BoguNoz/Simplify/blob/8927a5f295da2866c60fb7ecc046fc43733fcfc9/src/events/validator.ts#L58)

Represents a validator function that checks a field’s value.

## Parameters

### store

[`BaseStore`](../classes/BaseStore.md)

The store instance containing the field being validated.

### value

`any`

The current field value.

### id

`string`

The ID of validated field.

## Returns

[`ValidatorResponse`](ValidatorResponse.md)

The validation result object.

## Remarks

- All function arguments are automatically injected by the store during field validation.
- Validators should be lightweight and synchronous when possible.  
- For complex logic or async workflows, use operations instead.

## Example

```ts
// Example custom validator:
const isEmail = (store, value) => ({
  isValid: /\S+@\S+\.\S+/.test(value),
  isWarning: false,
  message: "Invalid email address"
});
```
```ts
// Example usage in repository:
repositoryFields.testField.validators = [testValidator]
```

## See

BaseStore
