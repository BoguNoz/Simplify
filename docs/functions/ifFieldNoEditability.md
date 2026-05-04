[**Simplify**](../README.md)

***

[Simplify](../README.md) / ifFieldNoEditability

# Function: ifFieldNoEditability()

> **ifFieldNoEditability**(`target`, `master`, `store`): `Promise`\<`void`\>

Defined in: [src/events/dependency.ts:70](https://github.com/BoguNoz/Simplify/blob/8927a5f295da2866c60fb7ecc046fc43733fcfc9/src/events/dependency.ts#L70)

Enables the target field only when the master field’s value is null, empty, false, or undefined.

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
     {fieldId: testRegisteredFields.targetId, events: [ifFieldNoEditability]},
 ]
```

## Remarks

- Inverse behavior of [ifFieldEditability](ifFieldEditability.md).
- All function arguments are automatically injected by the store.

## See

BaseDependencyFn
