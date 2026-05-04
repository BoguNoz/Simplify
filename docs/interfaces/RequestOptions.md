[**Simplify**](../README.md)

***

[Simplify](../README.md) / RequestOptions

# Interface: RequestOptions

Defined in: [src/services/base-service.ts:3](https://github.com/BoguNoz/Simplify/blob/8927a5f295da2866c60fb7ecc046fc43733fcfc9/src/services/base-service.ts#L3)

## Extends

- `RequestInit`

## Properties

### body?

> `optional` **body?**: `BodyInit` \| `null`

Defined in: node\_modules/typescript/lib/lib.dom.d.ts:1861

A BodyInit object or null to set request's body.

#### Inherited from

`RequestInit.body`

***

### cache?

> `optional` **cache?**: `RequestCache`

Defined in: node\_modules/typescript/lib/lib.dom.d.ts:1863

A string indicating how the request will interact with the browser's cache to set request's cache.

#### Inherited from

`RequestInit.cache`

***

### credentials?

> `optional` **credentials?**: `RequestCredentials`

Defined in: node\_modules/typescript/lib/lib.dom.d.ts:1865

A string indicating whether credentials will be sent with the request always, never, or only when sent to a same-origin URL. Sets request's credentials.

#### Inherited from

`RequestInit.credentials`

***

### headers?

> `optional` **headers?**: `HeadersInit`

Defined in: node\_modules/typescript/lib/lib.dom.d.ts:1867

A Headers object, an object literal, or an array of two-item arrays to set request's headers.

#### Inherited from

`RequestInit.headers`

***

### integrity?

> `optional` **integrity?**: `string`

Defined in: node\_modules/typescript/lib/lib.dom.d.ts:1869

A cryptographic hash of the resource to be fetched by request. Sets request's integrity.

#### Inherited from

`RequestInit.integrity`

***

### keepalive?

> `optional` **keepalive?**: `boolean`

Defined in: node\_modules/typescript/lib/lib.dom.d.ts:1871

A boolean to set request's keepalive.

#### Inherited from

`RequestInit.keepalive`

***

### method?

> `optional` **method?**: `string`

Defined in: node\_modules/typescript/lib/lib.dom.d.ts:1873

A string to set request's method.

#### Inherited from

`RequestInit.method`

***

### mode?

> `optional` **mode?**: `RequestMode`

Defined in: node\_modules/typescript/lib/lib.dom.d.ts:1875

A string to indicate whether the request will use CORS, or will be restricted to same-origin URLs. Sets request's mode.

#### Inherited from

`RequestInit.mode`

***

### priority?

> `optional` **priority?**: `RequestPriority`

Defined in: node\_modules/typescript/lib/lib.dom.d.ts:1876

#### Inherited from

`RequestInit.priority`

***

### redirect?

> `optional` **redirect?**: `RequestRedirect`

Defined in: node\_modules/typescript/lib/lib.dom.d.ts:1878

A string indicating whether request follows redirects, results in an error upon encountering a redirect, or returns the redirect (in an opaque fashion). Sets request's redirect.

#### Inherited from

`RequestInit.redirect`

***

### referrer?

> `optional` **referrer?**: `string`

Defined in: node\_modules/typescript/lib/lib.dom.d.ts:1880

A string whose value is a same-origin URL, "about:client", or the empty string, to set request's referrer.

#### Inherited from

`RequestInit.referrer`

***

### referrerPolicy?

> `optional` **referrerPolicy?**: `ReferrerPolicy`

Defined in: node\_modules/typescript/lib/lib.dom.d.ts:1882

A referrer policy to set request's referrerPolicy.

#### Inherited from

`RequestInit.referrerPolicy`

***

### responseType?

> `optional` **responseType?**: [`BaseResponseTypeEnum`](../enumerations/BaseResponseTypeEnum.md)

Defined in: [src/services/base-service.ts:4](https://github.com/BoguNoz/Simplify/blob/8927a5f295da2866c60fb7ecc046fc43733fcfc9/src/services/base-service.ts#L4)

***

### signal?

> `optional` **signal?**: `AbortSignal` \| `null`

Defined in: node\_modules/typescript/lib/lib.dom.d.ts:1884

An AbortSignal to set request's signal.

#### Inherited from

`RequestInit.signal`

***

### window?

> `optional` **window?**: `null`

Defined in: node\_modules/typescript/lib/lib.dom.d.ts:1886

Can only be null. Used to disassociate request from any Window.

#### Inherited from

`RequestInit.window`
