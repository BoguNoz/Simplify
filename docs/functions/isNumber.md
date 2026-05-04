[**Simplify**](../README.md)

***

[Simplify](../README.md) / isNumber

# Function: isNumber()

> **isNumber**(`store`, `value`, `id`): `object`

Defined in: [src/events/validator.ts:151](https://github.com/BoguNoz/Simplify/blob/8927a5f295da2866c60fb7ecc046fc43733fcfc9/src/events/validator.ts#L151)

Validates that a field is number.

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

> **isValid**: `boolean`

### isWarning

> **isWarning**: `boolean` = `false`

### message

> **message**: `string` = `text.errorMessages.isNumber`

## Remarks

- All function arguments are automatically injected by the store during field validation.

## Example

```ts
// Example usage in repository:
repositoryFields.testField.validators = [isNumber]
```

## See

BaseValidatorFn
