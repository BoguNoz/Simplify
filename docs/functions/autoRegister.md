[**Simplify**](../README.md)

***

[Simplify](../README.md) / autoRegister

# Function: autoRegister()

> **autoRegister**(`store`): `void`

Defined in: [src/engine/registres/auto-register.ts:18](https://github.com/BoguNoz/Simplify/blob/8927a5f295da2866c60fb7ecc046fc43733fcfc9/src/engine/registres/auto-register.ts#L18)

Automatically registers all properties and methods of a store for MobX reactivity.

## Parameters

### store

`any`

The store instance to automatically register with MobX.

## Returns

`void`

## Remarks

This helper function iterates over all instance properties and prototype methods
of a given store object and applies MobX annotations automatically:
- All instance properties are annotated as `observable`.
- All prototype methods are annotated as `action`.

This removes the need to manually call `makeObservable` with explicit annotations
for each field and method, reducing boilerplate in your MobX registres.
