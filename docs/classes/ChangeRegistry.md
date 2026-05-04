[**Simplify**](../README.md)

***

[Simplify](../README.md) / ChangeRegistry

# Class: ChangeRegistry

Defined in: [src/engine/registres/change-registry.ts:11](https://github.com/BoguNoz/Simplify/blob/8927a5f295da2866c60fb7ecc046fc43733fcfc9/src/engine/registres/change-registry.ts#L11)

A registry for batching reactive changes in a controlled, debounced manner.

## Remarks

The `ChangeRegistry` collects functions (typically MobX state modifications)
and executes them together in a single `runInAction` block after a small delay.
This helps prevent unnecessary recomputations and improves performance in highly reactive contexts.

## Constructors

### Constructor

> **new ChangeRegistry**(`delay?`): `ChangeRegistry`

Defined in: [src/engine/registres/change-registry.ts:18](https://github.com/BoguNoz/Simplify/blob/8927a5f295da2866c60fb7ecc046fc43733fcfc9/src/engine/registres/change-registry.ts#L18)

#### Parameters

##### delay?

`number` = `100`

#### Returns

`ChangeRegistry`

## Methods

### forceFlush()

> `readonly` **forceFlush**(): `Promise`\<`void`\>

Defined in: [src/engine/registres/change-registry.ts:32](https://github.com/BoguNoz/Simplify/blob/8927a5f295da2866c60fb7ecc046fc43733fcfc9/src/engine/registres/change-registry.ts#L32)

Forces immediate execution of all pending queued changes.

#### Returns

`Promise`\<`void`\>

#### Remarks

- This cancels any scheduled automatic flush and runs all queued
changes immediately inside a single `MobX.runInAction` call.

***

### registerChange()

> `readonly` **registerChange**(`fn`): `void`

Defined in: [src/engine/registres/change-registry.ts:57](https://github.com/BoguNoz/Simplify/blob/8927a5f295da2866c60fb7ecc046fc43733fcfc9/src/engine/registres/change-registry.ts#L57)

Registers a reactive change callback to be executed in the next flush cycle.

#### Parameters

##### fn

() => `void` \| `Promise`\<`void`\>

A function (sync or async) that performs a state change.

#### Returns

`void`

#### Remarks

- Each registered change is queued and executed later in a single `runInAction` block,
ensuring all changes are batched together for optimal performance.

#### Example

```ts
registry.registerChange(() => {
  formStore.fields["username"].value = "Alice";
});
```
