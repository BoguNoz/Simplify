[**Simplify**](../README.md)

***

[Simplify](../README.md) / BaseCompositeInterface

# Interface: BaseCompositeInterface

Defined in: [src/models/interfaces/base-composite-interface.ts:4](https://github.com/BoguNoz/Simplify/blob/8927a5f295da2866c60fb7ecc046fc43733fcfc9/src/models/interfaces/base-composite-interface.ts#L4)

## Properties

### compositeId

> **compositeId**: `string`

Defined in: [src/models/interfaces/base-composite-interface.ts:9](https://github.com/BoguNoz/Simplify/blob/8927a5f295da2866c60fb7ecc046fc43733fcfc9/src/models/interfaces/base-composite-interface.ts#L9)

The composite identifier used to load configuration
from [BaseCompositeStore.composites](../classes/BaseCompositeStore.md#composites).

***

### compositeStore

> **compositeStore**: [`BaseCompositeStore`](../classes/BaseCompositeStore.md)

Defined in: [src/models/interfaces/base-composite-interface.ts:15](https://github.com/BoguNoz/Simplify/blob/8927a5f295da2866c60fb7ecc046fc43733fcfc9/src/models/interfaces/base-composite-interface.ts#L15)

Store holding composites and shared layout utilities.
Provides metadata such as dimensions and section structure.

***

### handleBlur?

> `optional` **handleBlur?**: (`fieldId`) => `void`

Defined in: [src/models/interfaces/base-composite-interface.ts:27](https://github.com/BoguNoz/Simplify/blob/8927a5f295da2866c60fb7ecc046fc43733fcfc9/src/models/interfaces/base-composite-interface.ts#L27)

Optional blur handler for partials fields.
Useful for adding extra behaviour to the field.

#### Parameters

##### fieldId

`string`

#### Returns

`void`

***

### handleChange?

> `optional` **handleChange?**: (`fieldId`, `value`) => `void`

Defined in: [src/models/interfaces/base-composite-interface.ts:33](https://github.com/BoguNoz/Simplify/blob/8927a5f295da2866c60fb7ecc046fc43733fcfc9/src/models/interfaces/base-composite-interface.ts#L33)

Optional change handler allowing you to intercept field changes.
Useful for adding extra behaviour to the field.

#### Parameters

##### fieldId

`string`

##### value

`any`

#### Returns

`void`

***

### store

> **store**: [`BaseStore`](../classes/BaseStore.md)

Defined in: [src/models/interfaces/base-composite-interface.ts:21](https://github.com/BoguNoz/Simplify/blob/8927a5f295da2866c60fb7ecc046fc43733fcfc9/src/models/interfaces/base-composite-interface.ts#L21)

The data store backing the fields inside the partials.
Field values, validation states and actions are retrieved from here.
