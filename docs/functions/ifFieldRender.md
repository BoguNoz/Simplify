[**Simplify**](../README.md)

***

[Simplify](../README.md) / ifFieldRender

# Function: ifFieldRender()

> **ifFieldRender**(`target`, `master`, `store`): `Promise`\<`void`\>

Defined in: [src/events/dependency.ts:118](https://github.com/BoguNoz/Simplify/blob/8927a5f295da2866c60fb7ecc046fc43733fcfc9/src/events/dependency.ts#L118)

Controls the visibility (rendering) of the target field based on the master field’s value.

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
     {fieldId: testRegisteredFields.targetId, events: [ifFieldRender]},
 ]
```

## Remarks

- The field will be rendered only if the master field’s value is not null, empty, false, or undefined.
- All function arguments are automatically injected by the store.

## See

BaseDependencyFn
