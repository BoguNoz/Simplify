[**Simplify**](../README.md)

***

[Simplify](../README.md) / baseCompositeInitializationSetup

# Function: baseCompositeInitializationSetup()

> **baseCompositeInitializationSetup**(`compositeId`, `compositeStore`, `store`): `Promise`\<`void`\>

Defined in: [src/stores/utils/composite-store-utils.ts:11](https://github.com/BoguNoz/Simplify/blob/f26a848e000bf8e5948c0948c0a07286ae4b8d74/src/stores/utils/composite-store-utils.ts#L11)

Registers a composite in the store and initializes its fields.

## Parameters

### compositeId

`string`

The ID of the composite.

### compositeStore

[`BaseCompositeStore`](../classes/BaseCompositeStore.md)

The composite store instance to register.

### store

[`BaseStore`](../classes/BaseStore.md)

The parent field store where the composite will be registered.

## Returns

`Promise`\<`void`\>
