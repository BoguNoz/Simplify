[**Simplify**](../README.md)

***

[Simplify](../README.md) / modeToPercentage

# Function: modeToPercentage()

> **modeToPercentage**(`mode`): `number`[]

Defined in: [src/lib/base-composite-model-utils.ts:113](https://github.com/BoguNoz/Simplify/blob/8927a5f295da2866c60fb7ecc046fc43733fcfc9/src/lib/base-composite-model-utils.ts#L113)

Returns the base width and height percentages for a composite layout mode.

## Parameters

### mode

`string`

The composite's layout mode.

## Returns

`number`[]

A tuple `[widthPercentage, heightPercentage]`.

## Remarks

Each mode defines a preset layout footprint expressed as `[width%, height%]`.
These values represent how much of the available viewport space the composite
should occupy before any additional scaling (e.g., via the `size` factor).

Layout modes:
- `"vertical-window"` – Tall and narrow layout (50% width × 90% height)
- `"square-window"` – Balanced, square-like layout (80% × 80%)
- `"horizontal-window"` – Wide and shorter layout (90% × 60%)
- *default* – Full-size layout (100% × 100%)

The returned percentages are intended to be multiplied by viewport dimensions
to compute actual pixel sizes.

## Example

```ts
modeToPercentage("square-window"); // [80, 80]
modeToPercentage("unknown");       // [100, 100]
```
