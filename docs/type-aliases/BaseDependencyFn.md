[**Simplify**](../README.md)

***

[Simplify](../README.md) / BaseDependencyFn

# Type Alias: BaseDependencyFn

> **BaseDependencyFn** = (`target`, `master`, `store`) => `void` \| `Promise`\<`void`\>

Defined in: [src/events/dependency.ts:26](https://github.com/BoguNoz/Simplify/blob/8927a5f295da2866c60fb7ecc046fc43733fcfc9/src/events/dependency.ts#L26)

Represents a dependency function that reacts to changes in a source (master) field.

## Parameters

### target

`string`

The ID of the field affected by the dependency.

### master

`string`

The ID of the field that triggered the dependency.

### store

[`BaseStore`](../classes/BaseStore.md)

The store instance containing both fields.

## Returns

`void` \| `Promise`\<`void`\>

Either nothing (`void`) or a `Promise<void>` for asynchronous operations.

## Remarks

- All function arguments are automatically injected by the store during dependency execution by default updateDependents.

## Example

```ts
// Example usage in field repository:
 repositoryFields.testField.dependencies = [
     {fieldId: testRegisteredFields.targetId, events: [ifFieldEditability]},
 ]
```

## See

BaseStore
