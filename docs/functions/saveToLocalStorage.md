[**Simplify**](../README.md)

***

[Simplify](../README.md) / saveToLocalStorage

# Function: saveToLocalStorage()

> **saveToLocalStorage**(`key`, `data`): `Promise`\<`void`\>

Defined in: [src/lib/local-storage/utils/local-storage-utils.ts:40](https://github.com/BoguNoz/Simplify/blob/8927a5f295da2866c60fb7ecc046fc43733fcfc9/src/lib/local-storage/utils/local-storage-utils.ts#L40)

Saves an item to local storage under a unique key.

## Parameters

### key

`string`

Base key name for the entry.

### data

`any`

The data object to be saved.

## Returns

`Promise`\<`void`\>

## Remarks

- A random numeric suffix (1000–9999) is appended to the key to ensure uniqueness.
- Displays a toast message indicating success or failure.
