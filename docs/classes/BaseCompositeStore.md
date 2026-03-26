[**Simplify**](../README.md)

***

[Simplify](../README.md) / BaseCompositeStore

# Abstract Class: BaseCompositeStore

Defined in: [src/stores/base-composite-store.ts:48](https://github.com/BoguNoz/Simplify/blob/f26a848e000bf8e5948c0948c0a07286ae4b8d74/src/stores/base-composite-store.ts#L48)

Abstract base class that manages a collection of composites and their corresponding field registres.

## Remarks

The BaseCompositeStore acts as a coordinator between multiple [BaseStore](BaseStore.md) instances,
handling initialization, rendering logic, and registration of composites.
Each composite represents a logical group of fields that can be conditionally rendered
and validated as a unit.

## Example

```ts
// Example base implementation:
export class CompositeStore extends BaseCompositeStore {
    composites: Record<string, BaseCompositeModel> = {};
    registres: Record<string, BaseStore> = {}

    constructor() {
        super();
        autoRegister(this)
    }
}

export const compositeStore = new CompositeStore();
```

```ts
// Example store initialization 
compositeStore.registerStore(compositeId, store);
await compositeStore.initializeFields(compositeId);
```

## See

 - BaseCompositeStore.initializeComposite
 - BaseCompositeStore.initializeFields
 - BaseCompositeStore.renderComposite
 - BaseCompositeStore.setRendering
 - BaseCompositeStore.registerStore
 - BaseCompositeStore.getStore
 - BaseCompositeStore.invokeCompositeDeconstructor
 - autoRegister

## Constructors

### Constructor

> **new BaseCompositeStore**(): `BaseCompositeStore`

#### Returns

`BaseCompositeStore`

## Properties

### composites

> **composites**: `Record`\<`string`, `BaseCompositeModel`\> = `{}`

Defined in: [src/stores/base-composite-store.ts:49](https://github.com/BoguNoz/Simplify/blob/f26a848e000bf8e5948c0948c0a07286ae4b8d74/src/stores/base-composite-store.ts#L49)

***

### renderedComposites

> **renderedComposites**: `ObservableMap`\<`string`, `boolean`\>

Defined in: [src/stores/base-composite-store.ts:51](https://github.com/BoguNoz/Simplify/blob/f26a848e000bf8e5948c0948c0a07286ae4b8d74/src/stores/base-composite-store.ts#L51)

***

### stores

> **stores**: `Record`\<`string`, [`BaseStore`](BaseStore.md)\> = `{}`

Defined in: [src/stores/base-composite-store.ts:50](https://github.com/BoguNoz/Simplify/blob/f26a848e000bf8e5948c0948c0a07286ae4b8d74/src/stores/base-composite-store.ts#L50)

## Methods

### getStore()

> **getStore**(`id`): [`BaseStore`](BaseStore.md)

Defined in: [src/stores/base-composite-store.ts:131](https://github.com/BoguNoz/Simplify/blob/f26a848e000bf8e5948c0948c0a07286ae4b8d74/src/stores/base-composite-store.ts#L131)

Retrieves the store associated with the specified composite.

#### Parameters

##### id

`string`

The ID of the composite.

#### Returns

[`BaseStore`](BaseStore.md)

The store instance linked to the composite.

***

### initializeComposite()

> **initializeComposite**(`composites`): `void`

Defined in: [src/stores/base-composite-store.ts:61](https://github.com/BoguNoz/Simplify/blob/f26a848e000bf8e5948c0948c0a07286ae4b8d74/src/stores/base-composite-store.ts#L61)

Initializes all composites based on their configuration.

#### Parameters

##### composites

`BaseCompositeModel`[]

List of composites configurations

#### Returns

`void`

#### Remarks

- Determines whether each composite should be rendered base on composite render field.

***

### initializeFields()

> **initializeFields**(`id`): `Promise`\<`void`\>

Defined in: [src/stores/base-composite-store.ts:75](https://github.com/BoguNoz/Simplify/blob/f26a848e000bf8e5948c0948c0a07286ae4b8d74/src/stores/base-composite-store.ts#L75)

Invokes initialization of fields within a composite.

#### Parameters

##### id

`string`

The ID of the composite.

#### Returns

`Promise`\<`void`\>

***

### invokeCompositeDeconstructor()

> **invokeCompositeDeconstructor**(`id`, `free`, ...`args`): `Promise`\<`void`\>

Defined in: [src/stores/base-composite-store.ts:154](https://github.com/BoguNoz/Simplify/blob/f26a848e000bf8e5948c0948c0a07286ae4b8d74/src/stores/base-composite-store.ts#L154)

Invokes the deconstructor for a specific composite and all of its fields.

#### Parameters

##### id

`string`

The ID of the composite to deconstruct.

##### free

`boolean`

Whether the composite and its fields should be removed from the store after deconstruction.

##### args

...`any`[]

Optional arguments passed to the composite's deconstructor.

#### Returns

`Promise`\<`void`\>

#### Remarks

- This method first executes the composite's own `deconstructor` function,
and then recursively calls the `invokeDeconstructor` method on each field
belonging to the composite.

- If the `free` parameter is set to `true`, both the composite and its fields
are removed from their respective registres after deconstruction.

- If any of the composite's fields require arguments for their deconstructors,
make sure to invoke those field deconstructors manually beforehand.

#### See

invokeDeconstructor

***

### registerStore()

> **registerStore**(`id`, `store`): `void`

Defined in: [src/stores/base-composite-store.ts:119](https://github.com/BoguNoz/Simplify/blob/f26a848e000bf8e5948c0948c0a07286ae4b8d74/src/stores/base-composite-store.ts#L119)

Registers a store for the specified composite.

#### Parameters

##### id

`string`

The ID of the composite.

##### store

[`BaseStore`](BaseStore.md)

The store instance to register.

#### Returns

`void`

***

### renderComposite()

> **renderComposite**(`id`): `boolean`

Defined in: [src/stores/base-composite-store.ts:87](https://github.com/BoguNoz/Simplify/blob/f26a848e000bf8e5948c0948c0a07286ae4b8d74/src/stores/base-composite-store.ts#L87)

Returns the render state of the composite.

#### Parameters

##### id

`string`

The ID of the composite.

#### Returns

`boolean`

`true` if the composite should be rendered otherwise `false`.

***

### setRendering()

> **setRendering**(`id`, `state?`): `void`

Defined in: [src/stores/base-composite-store.ts:101](https://github.com/BoguNoz/Simplify/blob/f26a848e000bf8e5948c0948c0a07286ae4b8d74/src/stores/base-composite-store.ts#L101)

Sets the render state of a composite.

#### Parameters

##### id

`string`

The ID of the composite.

##### state?

`boolean`

The desired render state. If omitted, the state is determined automatically.

#### Returns

`void`

#### Remarks

- If the `state` parameter is not specified, the composite's BaseCompositeModel.renderFn \`renderFn\`
will be used to determine whether the composite should be rendered.
