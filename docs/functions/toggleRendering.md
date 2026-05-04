[**Simplify**](../README.md)

***

[Simplify](../README.md) / toggleRendering

# Function: toggleRendering()

> **toggleRendering**(`targetIds`, `store`, `value?`): [`BaseOperationFn`](../type-aliases/BaseOperationFn.md)

Defined in: [src/events/operation.ts:45](https://github.com/BoguNoz/Simplify/blob/8927a5f295da2866c60fb7ecc046fc43733fcfc9/src/events/operation.ts#L45)

Toggles the visibility (`render` property) of one or more fields.

## Parameters

### targetIds

`string`[]

The IDs of the fields whose visibility should be toggled.

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
     exampleOperation([testRegisteredFields.targetId], fieldStore),
 ];
```

## See

BaseOperationFn
