[**Simplify**](../README.md)

***

[Simplify](../README.md) / ifFieldEditability

# Function: ifFieldEditability()

> **ifFieldEditability**(`target`, `master`, `store`): `Promise`\<`void`\>

Defined in: [src/events/dependency.ts:45](https://github.com/BoguNoz/Simplify/blob/f26a848e000bf8e5948c0948c0a07286ae4b8d74/src/events/dependency.ts#L45)

Disables the target field when the master field’s value is null, empty, false, or undefined.

## Parameters

### target

`string`

### master

`string`

### store

[`BaseStore`](../classes/BaseStore.md)

## Returns

`Promise`\<`void`\>

## Example

```ts
// Example usage in field repository:
 repositoryFields.testField.dependencies = [
     {fieldId: testRegisteredFields.targetId, events: [ifFieldEditability]},
 ]
```

## Remarks

- Commonly used to control editability based on another field’s state.
- All function arguments are automatically injected by the store.

## See

BaseDependencyFn
