[**Simplify**](../README.md)

***

[Simplify](../README.md) / createServiceClient

# Function: createServiceClient()

> **createServiceClient**(`baseUrl`): \<`T`\>(`endpoint`, `options`) => `Promise`\<`T`\>

Defined in: [src/services/base-service.ts:37](https://github.com/BoguNoz/Simplify/blob/f26a848e000bf8e5948c0948c0a07286ae4b8d74/src/services/base-service.ts#L37)

Creates a strongly-typed HTTP client for performing API requests.

## Parameters

### baseUrl

`string`

The base URL for all API requests (e.g., `"https://api.example.com"`).

## Returns

A reusable `sendRequest` function that performs HTTP calls relative to the provided `baseUrl`.

\<`T`\>(`endpoint`, `options`) => `Promise`\<`T`\>

## Remarks

This utility wraps the native `fetch` API and supports multiple response types
through the BaseResponseTypeEnum. It automatically merges default headers
with any provided ones and handles error responses by throwing exceptions.

## Example

```ts
const apiClient = createServiceClient("https://api.example.com");

// Example: Fetch JSON data
const data = await apiClient<MyDataType>("/users", {
  method: "GET",
  responseType: BaseResponseTypeEnum.Json,
});

// Example: Download binary file
const fileBuffer = await apiClient<ArrayBuffer>("/file", {
  method: "GET",
  responseType: BaseResponseTypeEnum.ArrayBuffer,
});
```

## See

BaseResponseTypeEnum
