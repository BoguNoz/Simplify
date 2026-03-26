[**Simplify**](../README.md)

***

[Simplify](../README.md) / saveToLocalStorage

# Function: saveToLocalStorage()

> **saveToLocalStorage**(`key`, `data`): `Promise`\<`void`\>

Defined in: [src/lib/local-storage/utils/local-storage-utils.ts:40](https://github.com/BoguNoz/Simplify/blob/f26a848e000bf8e5948c0948c0a07286ae4b8d74/src/lib/local-storage/utils/local-storage-utils.ts#L40)

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
