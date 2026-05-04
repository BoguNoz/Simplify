[**Simplify**](../README.md)

***

[Simplify](../README.md) / ValidatorResponse

# Type Alias: ValidatorResponse

> **ValidatorResponse** = `object`

Defined in: [src/events/validator.ts:10](https://github.com/BoguNoz/Simplify/blob/8927a5f295da2866c60fb7ecc046fc43733fcfc9/src/events/validator.ts#L10)

Represents the result of a field validation.

## Properties

### isValid

> **isValid**: `boolean`

Defined in: [src/events/validator.ts:14](https://github.com/BoguNoz/Simplify/blob/8927a5f295da2866c60fb7ecc046fc43733fcfc9/src/events/validator.ts#L14)

Indicates whether the field value is valid.

***

### isWarning

> **isWarning**: `boolean`

Defined in: [src/events/validator.ts:19](https://github.com/BoguNoz/Simplify/blob/8927a5f295da2866c60fb7ecc046fc43733fcfc9/src/events/validator.ts#L19)

Indicates whether the response is a warning instead of a strict validation error.

***

### message

> **message**: `string`

Defined in: [src/events/validator.ts:24](https://github.com/BoguNoz/Simplify/blob/8927a5f295da2866c60fb7ecc046fc43733fcfc9/src/events/validator.ts#L24)

A message describing the validation result or error.
