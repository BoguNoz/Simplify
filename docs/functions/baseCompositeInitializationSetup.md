[**Simplify**](../README.md)

***

[Simplify](../README.md) / baseCompositeInitializationSetup

# Function: baseCompositeInitializationSetup()

> **baseCompositeInitializationSetup**(`compositeId`, `compositeStore`, `store`): `Promise`\<`void`\>

Defined in: [src/stores/utils/composite-store-utils.ts:11](https://github.com/BoguNoz/Simplify/blob/8927a5f295da2866c60fb7ecc046fc43733fcfc9/src/stores/utils/composite-store-utils.ts#L11)

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
