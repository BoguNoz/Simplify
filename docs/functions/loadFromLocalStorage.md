[**Simplify**](../README.md)

***

[Simplify](../README.md) / loadFromLocalStorage

# Function: loadFromLocalStorage()

> **loadFromLocalStorage**(`key`): `Promise`\<`unknown`\>

Defined in: [src/lib/local-storage/utils/local-storage-utils.ts:59](https://github.com/BoguNoz/Simplify/blob/8927a5f295da2866c60fb7ecc046fc43733fcfc9/src/lib/local-storage/utils/local-storage-utils.ts#L59)

Loads an item from local storage.

## Parameters

### key

`string`

The key of the stored item.

## Returns

`Promise`\<`unknown`\>

The stored data, or `null` if loading failed.

## Remarks

- Displays a toast message if the operation fails.
