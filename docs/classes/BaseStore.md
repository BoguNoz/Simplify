[**Simplify**](../README.md)

***

[Simplify](../README.md) / BaseStore

# Abstract Class: BaseStore

Defined in: [src/stores/base-store.ts:43](https://github.com/BoguNoz/Simplify/blob/8927a5f295da2866c60fb7ecc046fc43733fcfc9/src/stores/base-store.ts#L43)

Abstract base class that provides a reactive, signal-like state management layer using MobX.

## Remarks

- Each field within the store acts as a reactive signal source.
When a field's value changes, all related operations and dependency functions are automatically triggered.
This enables dynamic partials behavior, field validation, and dependency propagation with minimal boilerplate.

- The class serves as the foundation for custom store implementations handling partials state,
validation, data sources, and inter-field logic.

## Example

```ts
// Example base implementation:
class FieldStore extends BaseStore {
    override fields: Record<string, BaseFieldModel> = {};
    override operations: Record<string, BaseOperationFn[]> = {};

    constructor() {
        super();
         autoRegister(this);
    }
}

export const fieldStore = new FieldStore();
```

```ts
// Example store initialization 
await fieldStore.initializeFields(fields);
```

## Constructors

### Constructor

> **new BaseStore**(): `BaseStore`

Defined in: [src/stores/base-store.ts:49](https://github.com/BoguNoz/Simplify/blob/8927a5f295da2866c60fb7ecc046fc43733fcfc9/src/stores/base-store.ts#L49)

#### Returns

`BaseStore`

## Properties

### fields

> **fields**: `Record`\<`string`, [`BaseFieldModel`](../interfaces/BaseFieldModel.md)\> = `{}`

Defined in: [src/stores/base-store.ts:44](https://github.com/BoguNoz/Simplify/blob/8927a5f295da2866c60fb7ecc046fc43733fcfc9/src/stores/base-store.ts#L44)

***

### operations

> **operations**: `Record`\<`string`, [`BaseOperationFn`](../type-aliases/BaseOperationFn.md)[]\> = `{}`

Defined in: [src/stores/base-store.ts:45](https://github.com/BoguNoz/Simplify/blob/8927a5f295da2866c60fb7ecc046fc43733fcfc9/src/stores/base-store.ts#L45)

***

### reverseDeps

> **reverseDeps**: `Record`\<`string`, `Record`\<`string`, [`BaseDependencyFn`](../type-aliases/BaseDependencyFn.md)[]\>\> = `{}`

Defined in: [src/stores/base-store.ts:46](https://github.com/BoguNoz/Simplify/blob/8927a5f295da2866c60fb7ecc046fc43733fcfc9/src/stores/base-store.ts#L46)

## Methods

### \_invokeDeconstructor()

> `protected` **\_invokeDeconstructor**(`id`, `free`, ...`args`): `Promise`\<`void`\>

Defined in: [src/stores/base-store.ts:337](https://github.com/BoguNoz/Simplify/blob/8927a5f295da2866c60fb7ecc046fc43733fcfc9/src/stores/base-store.ts#L337)

#### Parameters

##### id

`string`

##### free

`boolean`

##### args

...`any`[]

#### Returns

`Promise`\<`void`\>

***

### \_setFieldAdditValue()

> `protected` **\_setFieldAdditValue**(`id`, `addit`, `value`): `void`

Defined in: [src/stores/base-store.ts:311](https://github.com/BoguNoz/Simplify/blob/8927a5f295da2866c60fb7ecc046fc43733fcfc9/src/stores/base-store.ts#L311)

#### Parameters

##### id

`string`

##### addit

`string`

##### value

`any`

#### Returns

`void`

***

### \_setFieldEditability()

> `protected` **\_setFieldEditability**(`id`, `isEditable`): `void`

Defined in: [src/stores/base-store.ts:327](https://github.com/BoguNoz/Simplify/blob/8927a5f295da2866c60fb7ecc046fc43733fcfc9/src/stores/base-store.ts#L327)

#### Parameters

##### id

`string`

##### isEditable

`boolean`

#### Returns

`void`

***

### \_setFieldExcluded()

> `protected` **\_setFieldExcluded**(`id`, `excluded`): `void`

Defined in: [src/stores/base-store.ts:332](https://github.com/BoguNoz/Simplify/blob/8927a5f295da2866c60fb7ecc046fc43733fcfc9/src/stores/base-store.ts#L332)

#### Parameters

##### id

`string`

##### excluded

`boolean`

#### Returns

`void`

***

### \_setFieldState()

> `protected` **\_setFieldState**(`id`, `status`): `void`

Defined in: [src/stores/base-store.ts:319](https://github.com/BoguNoz/Simplify/blob/8927a5f295da2866c60fb7ecc046fc43733fcfc9/src/stores/base-store.ts#L319)

#### Parameters

##### id

`string`

##### status

`"error"` \| `"valid"` \| `"warning"` \| `"pending"`

#### Returns

`void`

***

### \_setFieldValue()

> `protected` **\_setFieldValue**(`id`, `value`): `Promise`\<`void`\>

Defined in: [src/stores/base-store.ts:294](https://github.com/BoguNoz/Simplify/blob/8927a5f295da2866c60fb7ecc046fc43733fcfc9/src/stores/base-store.ts#L294)

#### Parameters

##### id

`string`

##### value

`any`

#### Returns

`Promise`\<`void`\>

***

### \_validateField()

> `protected` **\_validateField**(`id`): `void`

Defined in: [src/stores/base-store.ts:348](https://github.com/BoguNoz/Simplify/blob/8927a5f295da2866c60fb7ecc046fc43733fcfc9/src/stores/base-store.ts#L348)

#### Parameters

##### id

`string`

#### Returns

`void`

***

### addValidators()

> **addValidators**(`id`, `validators`): `void`

Defined in: [src/stores/base-store.ts:262](https://github.com/BoguNoz/Simplify/blob/8927a5f295da2866c60fb7ecc046fc43733fcfc9/src/stores/base-store.ts#L262)

Adds new validators to a field, avoiding duplicates.

#### Parameters

##### id

`string`

The ID of the field.

##### validators

[`BaseValidatorFn`](../type-aliases/BaseValidatorFn.md)[]

The list of validator functions to add.

#### Returns

`void`

#### Remarks

- For safety reasons, avoid calling this method to dynamically alter validator list assigned to a field.

***

### getDataSource()

> `readonly` **getDataSource**(`id`, ...`args`): `Promise`\<`any`\>

Defined in: [src/stores/base-store.ts:251](https://github.com/BoguNoz/Simplify/blob/8927a5f295da2866c60fb7ecc046fc43733fcfc9/src/stores/base-store.ts#L251)

Retrieves data from the data source function defined for a field.

#### Parameters

##### id

`string`

The ID of the field.

##### args

...`any`[]

Data source function arguments.

#### Returns

`Promise`\<`any`\>

A promise resolving to the field's data source value.

#### Remarks

- Executes the data source function assigned to the field and returns the resulting value.

***

### getFieldValue()

> `readonly` **getFieldValue**(`id`): `any`

Defined in: [src/stores/base-store.ts:238](https://github.com/BoguNoz/Simplify/blob/8927a5f295da2866c60fb7ecc046fc43733fcfc9/src/stores/base-store.ts#L238)

Returns the current value of a field.

#### Parameters

##### id

`string`

The ID of the field.

#### Returns

`any`

The field's current assigned value.

***

### initializeFields()

> `readonly` **initializeFields**(`fields`): `Promise`\<`void`\>

Defined in: [src/stores/base-store.ts:170](https://github.com/BoguNoz/Simplify/blob/8927a5f295da2866c60fb7ecc046fc43733fcfc9/src/stores/base-store.ts#L170)

Initializes all fields based on their configuration.

#### Parameters

##### fields

[`BaseFieldModel`](../interfaces/BaseFieldModel.md)[]

List of fields configurations.

#### Returns

`Promise`\<`void`\>

#### Remarks

- Sets up field data sources, validators, operations, and dependencies.
- Registers reactions to automatically update dependent fields when values change.
- For required fields, an isEmpty validator is added automatically.
- Fields of type `Button`, `ButtonWithConfirmation`, and `Toggle` are their excluded flag set as `true` as default.

***

### invokeDeconstructor()

> `readonly` **invokeDeconstructor**(`id`, `free`, ...`args`): `Promise`\<`void`\>

Defined in: [src/stores/base-store.ts:155](https://github.com/BoguNoz/Simplify/blob/8927a5f295da2866c60fb7ecc046fc43733fcfc9/src/stores/base-store.ts#L155)

Invokes the deconstructor function defined for the specified field.

#### Parameters

##### id

`string`

The ID of the field to deconstruct.

##### free

`boolean`

Whether the field should be removed from the store after deconstruction.

##### args

...`any`[]

Optional arguments passed to the deconstructor function.

#### Returns

`Promise`\<`void`\>

#### Remarks

- This method executes the field’s custom `deconstructor` function, allowing cleanup or resource release related to the field.
- Use this method carefully. Deconstructors should only be called when the field is being permanently disposed or reset.
- If the `free` parameter is set to `true`, the field will also be removed from the store after its deconstructor is executed.
- To change behavior of this method override [\_invokeDeconstructor](#_invokedeconstructor) private method

***

### setFieldAdditValue()

> `readonly` **setFieldAdditValue**(`id`, `addit`, `value`): `void`

Defined in: [src/stores/base-store.ts:86](https://github.com/BoguNoz/Simplify/blob/8927a5f295da2866c60fb7ecc046fc43733fcfc9/src/stores/base-store.ts#L86)

Sets an additional (auxiliary) value for a field.

#### Parameters

##### id

`string`

The ID of the field.

##### addit

`string`

The name of the additional property.

##### value

`any`

The value to assign.

#### Returns

`void`

#### Remarks

- Safe way for setting additional value for a field.
- To change behavior of this method override [\_setFieldAdditValue](#_setfieldadditvalue) private method

***

### setFieldEditability()

> `readonly` **setFieldEditability**(`id`, `isEditable`): `void`

Defined in: [src/stores/base-store.ts:116](https://github.com/BoguNoz/Simplify/blob/8927a5f295da2866c60fb7ecc046fc43733fcfc9/src/stores/base-store.ts#L116)

Sets whether the field is editable or not.

#### Parameters

##### id

`string`

The ID of the field.

##### isEditable

`boolean`

Whether the field is editable or not.

#### Returns

`void`

#### Remarks

- To change behavior of this method override [\_setFieldEditability](#_setfieldeditability) private method

***

### setFieldExcluded()

> `readonly` **setFieldExcluded**(`id`, `excluded`): `void`

Defined in: [src/stores/base-store.ts:136](https://github.com/BoguNoz/Simplify/blob/8927a5f295da2866c60fb7ecc046fc43733fcfc9/src/stores/base-store.ts#L136)

Updates the `excluded` state of a field.

#### Parameters

##### id

`string`

Unique identifier of the target field.

##### excluded

`boolean`

`true` to exclude the field, `false` to include it.

#### Returns

`void`

#### Remarks

This method toggles whether a field should be considered in partials
processing, rendering, validation, or dependency evaluation.

- If the field does not exist in the store, the update is skipped.
- MobX reactions will be triggered automatically since the field is observable.
- To change behavior of this method override [\_setFieldExcluded](#_setfieldexcluded) private method

***

### setFieldState()

> `readonly` **setFieldState**(`id`, `status`): `void`

Defined in: [src/stores/base-store.ts:101](https://github.com/BoguNoz/Simplify/blob/8927a5f295da2866c60fb7ecc046fc43733fcfc9/src/stores/base-store.ts#L101)

Updates the field's state.

#### Parameters

##### id

`string`

The ID of the field.

##### status

`"error"` \| `"valid"` \| `"warning"` \| `"pending"`

The new status of the field.

#### Returns

`void`

#### Remarks

- To change behavior of this method override [\_setFieldState](#_setfieldstate) private method

***

### setFieldValue()

> `readonly` **setFieldValue**(`id`, `value`): `void`

Defined in: [src/stores/base-store.ts:69](https://github.com/BoguNoz/Simplify/blob/8927a5f295da2866c60fb7ecc046fc43733fcfc9/src/stores/base-store.ts#L69)

Sets a field's value and executes all associated functions.

#### Parameters

##### id

`string`

The ID of the field.

##### value

`any`

The new value to assign.

#### Returns

`void`

#### Remarks

- The setter also invokes asynchronous operations associated with the field.
- Use `await` when calling this method if subsequent logic depends on their completion.
- To change behavior of this method override [\_setFieldValue](#_setfieldvalue) private method

***

### updateDependents()

> **updateDependents**(`changedId`): `Promise`\<`void`\>

Defined in: [src/stores/base-store.ts:281](https://github.com/BoguNoz/Simplify/blob/8927a5f295da2866c60fb7ecc046fc43733fcfc9/src/stores/base-store.ts#L281)

Invokes all dependency functions

#### Parameters

##### changedId

`string`

The ID of the field whose value has changed.

#### Returns

`Promise`\<`void`\>

#### Remarks

- Dependency functions are registered during field initialization and are triggered whenever the corresponding field value changes.
- All dependency function arguments are automatically injected.

***

### validateField()

> **validateField**(`id`): `void`

Defined in: [src/stores/base-store.ts:227](https://github.com/BoguNoz/Simplify/blob/8927a5f295da2866c60fb7ecc046fc43733fcfc9/src/stores/base-store.ts#L227)

Runs validation for a specific field.

#### Parameters

##### id

`string`

The ID of the field.

#### Returns

`void`

#### Remarks

- Validation will occur, when field is not disabled and render
or value is not null or undefined or field is not excluded.
- Validation state is safe to the field `state`.
- To change behavior of this method override [\_validateField](#_validatefield) private method
