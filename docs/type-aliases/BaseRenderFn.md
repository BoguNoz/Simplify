[**Simplify**](../README.md)

***

[Simplify](../README.md) / BaseRenderFn

# Type Alias: BaseRenderFn

> **BaseRenderFn** = (`store`, `fieldStore`) => `boolean`

Defined in: [src/events/render.ts:25](https://github.com/BoguNoz/Simplify/blob/8927a5f295da2866c60fb7ecc046fc43733fcfc9/src/events/render.ts#L25)

Represents a render condition function for a composite.

## Parameters

### store

[`BaseCompositeStore`](../classes/BaseCompositeStore.md)

The composite store instance managing the composite’s state.

### fieldStore

[`BaseStore`](../classes/BaseStore.md)

The field store instance associated with the composite.

## Returns

`boolean`

`true` if the composite should be rendered; otherwise, `false`.

## Remarks

- Defines a rule that determines whether a composite should be displayed.  
- It is automatically invoked by the store when rendering state is evaluated, and
all function arguments are automatically injected by the store setRendering.

## Example

```ts
// Example usage in composite repository:
composites.testComposite.renderFn = testRenderFunction;
```

## See

BaseStore
