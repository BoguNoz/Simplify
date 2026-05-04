[**Simplify**](../README.md)

***

[Simplify](../README.md) / isInteger

# Function: isInteger()

> **isInteger**(`store`, `value`, `id`): `object`

Defined in: [src/events/validator.ts:126](https://github.com/BoguNoz/Simplify/blob/8927a5f295da2866c60fb7ecc046fc43733fcfc9/src/events/validator.ts#L126)

Validates that a field is intager.

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

> **message**: `string` = `text.errorMessages.isInteger`

## Remarks

All function arguments are automatically injected by the store during field validation.

## Example

```ts
// Example usage in repository:
repositoryFields.testField.validators = [isIntager]
```

## See

BaseValidatorFn
