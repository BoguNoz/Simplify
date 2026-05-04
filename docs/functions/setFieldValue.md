[**Simplify**](../README.md)

***

[Simplify](../README.md) / setFieldValue

# Function: setFieldValue()

> **setFieldValue**(`targetId`, `store`, `value?`): [`BaseOperationFn`](../type-aliases/BaseOperationFn.md)

Defined in: [src/events/operation.ts:74](https://github.com/BoguNoz/Simplify/blob/8927a5f295da2866c60fb7ecc046fc43733fcfc9/src/events/operation.ts#L74)

Sets the value of a target field.

## Parameters

### targetId

`string`

### store

[`BaseStore`](../classes/BaseStore.md)

The store instance containing the target fields.

### value?

`any`

## Returns

[`BaseOperationFn`](../type-aliases/BaseOperationFn.md)

A function that performs the toggling operation.

## Example

```ts
// Example usage in field repository:
 repositoryFields.testField.operations = [
     exampleOperation(testRegisteredFields.targetId, fieldStore),
 ];
```

## See

BaseOperationFn
