[**Simplify**](../README.md)

***

[Simplify](../README.md) / ifFieldRequire

# Function: ifFieldRequire()

> **ifFieldRequire**(`target`, `master`, `store`): `Promise`\<`void`\>

Defined in: [src/events/dependency.ts:94](https://github.com/BoguNoz/Simplify/blob/f26a848e000bf8e5948c0948c0a07286ae4b8d74/src/events/dependency.ts#L94)

Marks the target field as required when the master field’s value is not null, empty, false, or undefined.

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
     {fieldId: testRegisteredFields.targetId, events: [ifFieldRequire]},
 ]
```

## Remarks

- Typically used to enforce conditional validation requirements.
- All function arguments are automatically injected by the store.

## See

BaseDependencyFn
