[**Simplify**](../README.md)

***

[Simplify](../README.md) / BaseOperationFn

# Type Alias: BaseOperationFn

> **BaseOperationFn** = (`target?`, `store?`, `value?`) => `void` \| `Promise`\<`void`\>

Defined in: [src/events/operation.ts:25](https://github.com/BoguNoz/Simplify/blob/f26a848e000bf8e5948c0948c0a07286ae4b8d74/src/events/operation.ts#L25)

Represents a field operation function executed when a field’s value changes.

## Parameters

### target?

`any`

The target value or field affected by the operation.

### store?

[`BaseStore`](../classes/BaseStore.md)

The store instance that triggered the operation.

### value?

`any`

Optional value passed to the operation.

## Returns

`void` \| `Promise`\<`void`\>

Either nothing (`void`) or a `Promise<void>` for asynchronous operations.

## Remarks

- Operations may be triggered multiple times, so avoid performing heavy computations inside them.

## Example

```ts
// Example usage in field repository:
 repositoryFields.testField.operations = [
     exampleOperation(testRegisteredFields.targetId, fieldStore, "value"),
 ];
```

## See

BaseStore
