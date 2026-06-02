# Simplify

![npm](https://img.shields.io/npm/v/@bogunoz/simplify?style=flat-square)
![license](https://img.shields.io/npm/l/@bogunoz/simplify?style=flat-square)
![typescript](https://img.shields.io/badge/TypeScript-friendly-blue?style=flat-square)

Simplify is a modular, MobX-powered UI engine for React that makes it easy to build reactive forms, data-driven panels, and composite layouts.
It translates declarative field definitions, metadata, and dependency rules into live UI and state logic so you can focus on what your interface should do, not how it should wire itself.

### Key features

- Reactive form state with MobX
- Declarative field and composite configuration
- Built-in dependency, validation, and operation flow
- Tailwind + Radix + Shadcn-inspired UI components
- Local storage persistence and metadata helpers
- Composable dashboards, dynamic forms, and grouped layouts

---

## Table of Contents
- [Install](#install)
- [Why Simplify](#why-simplify)
- [How Simplify works](#how-simplify-works)
  - [Register fields](#1-register-fields)
  - [Create placeholders](#2-create-placeholders)
  - [Configure fields](#3-configure-fields)
  - [Build fields array](#4-build-fields-array)
  - [Register fields in a store](#5-register-fields-in-a-store)
- [Core concepts](#core-concepts)
  - [Field model](#field-model)
  - [Dependency system](#dependency-system)
  - [Operations](#operations)
  - [Composite stores](#composite-stores)
  - [UI primitives](#ui-primitives)
- [What is included](#what-is-included)
- [System architecture](#system-architecture)
- [Quick start](#quick-start)
- [Advanced usage](#advanced-usage)
  - [React & metadata](#react--metadata)
  - [Store utilities](#store-utilities)
- [Interactive Storybook examples](#interactive-storybook-examples)
- [Common scenarios](#common-scenarios)
- [API overview](#api-overview)
- [Best practices](#best-practices)
- [Documentation](#documentation)
- [Contributing](#contributing)
- [License](#license)

---

## Install

```bash
npm install @bogunoz/simplify
```

> Peer dependencies: `react`, `react-dom`, `mobx`, `mobx-react-lite`

---

## Why Simplify

Simplify is ideal for teams building data-driven interfaces that need to update automatically as underlying state changes.
It is especially valuable for:

- admin dashboards and settings forms
- dynamic configuration interfaces
- multi-step forms with conditional layouts
- reusable composite layouts and modular partials

By moving form structure into declarative data models and leveraging MobX for reactive state, Simplify reduces boilerplate and keeps UI state synchronized with minimal wiring.

---

## How Simplify works

### 1. Register fields
Define a field registry with stable IDs that represent every field in your form or partial.

```ts
const registeredFields = {
  firstName: "firstName",
  age: "age",
  isAdult: "isAdult",
};
```

### 2. Create placeholders
Use `createFieldPlaceholders()` to generate starter models for each field.
This creates `BaseFieldModel` objects with defaults for labels, description, validators, dependencies, and UI state.

```ts
const fields = createFieldPlaceholders(registeredFields, translations);
```

### 3. Configure fields
Set `fieldType`, add validators, attach dependency logic, and configure UI metadata.

### 4. Build fields array
Convert the placeholder map into an array ready for store initialization.

```ts
const formFields = buildFields(fields);
```

### 5. Register fields in a store
Use `BaseStore` or a custom subclass to hold the field state and trigger reactive updates.

---

## Core concepts

### Field model
Each field is backed by a `BaseFieldModel`.
Important field properties include:

- `id` — unique identifier
- `label` — visible field label
- `description` — help text or guidance
- `fieldType` — type of control from `BaseFieldTypesEnum`
- `render` — whether the field is rendered
- `isDisabled` / `isRequired` — field state flags
- `validators` — validation functions
- `operations` — actions executed on value change
- `dependencies` — reactive hooks to other fields

### Dependency system
Fields can depend on other fields by adding dependency rules.
Dependencies are tracked and executed automatically when the source field changes.
This lets you implement:

- conditional visibility
- dynamic validation requirements
- value propagation between fields
- contextual state changes

### Operations
Operations are functions that execute after a field update.
Use helpers like `setFieldValue()` or `toggleRendering()` to build reusable behavior.

### Composite stores
`BaseCompositeStore` coordinates multiple `BaseStore` instances and composite layouts.
It is ideal when your interface contains grouped forms, tabs, or composite panels.

### UI primitives
Simplify also exports styled components and layout building blocks such as:

- `FormCardComposite`
- `SectionComposite`
- `ChartComposite`
- `FormField`
- `BaseInput`, `BaseCheckbox`, `BaseSelector`, `BaseToggle`
- `Dialog`, `Tabs`, `Card`, `ButtonGroup`, `ResponsiveModal`

---

## What is included
Simplify includes a full reactive UI engine and helper toolkit for building dynamic forms, composites, and admin panels.

- `Models` & `Enums`: field metadata, composite definitions, section models, dependency models, and response enums.
- `Stores` & `engine`: `BaseStore`, `BaseCompositeStore`, `ChangeRegistry`, `autoRegister`, and composite initialization helpers.
- `React integration`: `composite` HOC, `MetadataContext`, `useMetadata`, and `useExistingMetadata`.
- `Reactive flow`: dependency rules, operations, validators, and render helpers that keep UI state synchronized automatically.
- `Field utilities`: `createFieldPlaceholders()`, `buildFields()`, `setFieldValue()`, `toggleRendering()`, and validation helpers like `isInteger` and `isNumber`.
- `Persistence & metadata`: local storage helpers, metadata utilities, translation support, and service client helpers.
- `Components`: composable form cards, section composites, chart components, field partials, and base UI controls built on Tailwind / Radix.

---

## System architecture
Simplify is built as a layered reactive UI engine where each part has a clear responsibility.

- `Models` — field and composite definitions (`BaseFieldModel`, `BaseCompositeModel`). Models define field state, metadata, validation rules, dependencies, and rendering hints.
- `Store` — `BaseStore` holds field state, sets up MobX reactions, and drives validation, operations, and dependency flow. `initializeFields()` wires field values, validators, operations, and reverse dependency maps.
- `Composite store` — `BaseCompositeStore` orchestrates multiple `BaseStore` instances, manages composite registration, and controls conditional rendering for grouped UI sections.
- `Event engine` — dependencies, operations, and validators form a reactive execution graph. When a field changes, the engine updates dependent fields, visibility, validation state, and any follow-up operations automatically.
- `UI layer` — React components consume models and store state. Components like `FormField`, `FormCardComposite`, and `SectionComposite` render the interface from synced metadata and field state.

### Architecture flow
![Architecture flow](docs/images/architecture-flow.svg)

### System overview
![System overview](docs/images/system-overview.svg)

### Legend
- `Registered fields` — stable field identifiers used across forms and composites
- `createFieldPlaceholders()` — generates default `BaseFieldModel` definitions
- `BaseStore / BaseCompositeStore` — reactive state containers and composite orchestrators
- `MobX reactions` — automatic observers that trigger updates when field values change
- `dependency engine` — evaluates field dependencies and updates related UI state
- `React UI components` — presentation layer consuming models and store state

### Data flow summary
1. Define a stable field registry and generate placeholders with `createFieldPlaceholders()`.
2. Configure field types, validation rules, operations, and dependencies.
3. Convert placeholders into a field array using `buildFields()` and initialize them in a `BaseStore`.
4. React views observe field models and update automatically as state changes.
5. Dependency and operation logic runs in the background, so the UI reacts to changes without manual wiring.

---

## Quick start

```ts
import {
  BaseFieldTypesEnum,
  BaseStore,
  buildFields,
  createFieldPlaceholders,
  isInteger,
  setFieldValue,
  toggleRendering,
} from "@bogunoz/simplify";

const registeredFields = {
  firstName: "firstName",
  age: "age",
  isAdult: "isAdult",
};

const translations = {
  firstNameLabel: "First Name",
  firstNameDescription: "Enter your first name.",
  ageLabel: "Age",
  ageDescription: "Enter your age.",
  isAdultLabel: "Adult",
  isAdultDescription: "Visible when age is 18 or older.",
};

const fields = createFieldPlaceholders(registeredFields, translations);

fields.firstName.fieldType = BaseFieldTypesEnum.Input;
fields.age.fieldType = BaseFieldTypesEnum.Input;
fields.isAdult.fieldType = BaseFieldTypesEnum.CheckBox;

fields.age.validators = [isInteger];

fields.isAdult.dependencies = [
  {
    fieldId: registeredFields.age,
    events: [
      (target: string, master: string, store: BaseStore) => {
        const field = store.fields[target];
        const value = store.getFieldValue(master);
        field.render = value >= 18;
      },
    ],
  },
];

export const formFields = buildFields(fields);
```

This example creates an age-driven form where the `isAdult` checkbox only renders when the age value reaches 18 or higher.

---

## Advanced usage

### React & metadata
Use the `composite` wrapper to automatically initialize composite state and metadata in mounted React components.

- `composite` is a higher-order component that binds `compositeId`, `compositeStore`, and `store`.
- `useMetadata()` / `useExistingMetadata()` provide the current composite metadata in nested components.
- `baseCompositeInitializationSetup()` registers a `BaseStore` with a `BaseCompositeStore` and initializes all fields.

### Store utilities
Simplify includes helpers to make custom stores easier to implement and optimize.

- `autoRegister(store)` automatically annotates store properties as MobX observables and methods as actions.
- `ChangeRegistry` batches state updates, reducing re-renders and ensuring changes occur within a single MobX action.

---

## Interactive Storybook examples

Simplify ships with Storybook stories that let you interact with real form fields and composites.
The repository includes live examples for:

- `partials/FormField` — every base field type rendered in an interactive Storybook story
- `composites/FormCardComposite` — a schema-driven form card with sections, field rendering, and validation
- `composites/SectionCardComposite` and `composites/ChartComposite` — composable dashboard parts with reactive controls

### Example: interactive field story

In Storybook, `FormField` is rendered against a mock store so you can try input, checkbox, select, switch, and toggle controls live.

```ts
import FormField from "@bogunoz/simplify/components/layout/FormField";
import { mockStore } from "./src/components/stories/mock-store";
import { mockBaseRegisteredFields } from "./src/components/stories/base-field-mocks";

<FormField
  fieldId={mockBaseRegisteredFields.baseInput}
  store={mockStore}
  hardDisable={false}
/>
```

### Example: interactive form composite

The `FormCardComposite` story uses a mock composite store and a ready-made field mock set to show how fields behave together.

```ts
import { FormCardComposite, FormCardCompositeSectionType } from "@bogunoz/simplify/components/layout/composites/FormCardComposite";
import { mockCompositeStore } from "./src/components/stories/composites/mock-composite-store";
import { mockStore } from "./src/components/stories/mock-store";
import { formMock } from "./src/components/stories/composites/form-mocks";

// This is the same pattern used by the Storybook story.
mockCompositeStore.initializeComposite({
  formCard: {
    id: "formCard",
    render: true,
    renderFn: () => true,
    mode: "vertical-window",
    sections: [
      {
        type: FormCardCompositeSectionType.HEADER,
        title: "Camera metadata",
        description: "Configure camera settings before upload.",
      },
      {
        type: FormCardCompositeSectionType.BODY,
        fields: formMock,
      },
    ],
  },
});

<FormCardComposite
  compositeId="formCard"
  compositeStore={mockCompositeStore}
  store={mockStore}
/>
```

Run Storybook locally to explore the interactive form stories:

```bash
npm run storybook
```

---

## Common scenarios

### Conditional rendering
Use field dependencies to hide or show fields automatically.

```ts
fields.isAdult.dependencies = [
  {
    fieldId: registeredFields.age,
    events: [
      (target, master, store) => {
        store.fields[target].render = store.getFieldValue(master) >= 18;
      },
    ],
  },
];
```

### Cross-field updates
Use `setFieldValue()` inside an operation to update related fields.

### Validation
Attach validators such as `isInteger`, `isNumber`, or custom functions directly to a field.

```ts
fields.age.validators = [isInteger];
```

### Local storage persistence
Simplify includes helpers for persistent form state:
- `saveToLocalStorage()`
- `loadFromLocalStorage()`
- `dispatchStorageEvent()`

---

## API overview

### Field utilities
- `createFieldPlaceholders()`
- `buildFields()`
- `BaseFieldTypesEnum`
- `isInteger`, `isNumber`, `isPositive`, `isNullOrUndefined`
- `toggleRendering()`, `setFieldValue()`

### Stores
- `BaseStore`
- `BaseCompositeStore`
- `baseCompositeInitializationSetup()`

### Engine
- `autoRegister()`
- `composite`
- `useMetadata()`
- `useExistingMetadata()`

### Components
- `FormCardComposite`
- `SectionComposite`
- `ChartComposite`
- `FormField`
- `BaseInput`, `BaseCheckbox`, `BaseSelector`, `BaseToggle`

### Local storage and metadata
- `saveToLocalStorage()`
- `loadFromLocalStorage()`
- `dispatchStorageEvent()`
- `getMetadata()`
- `setLanguage()`

---

## Best practices

- keep field registries stable and reusable
- use translations for labels and descriptions to keep models separate from UI text
- prefer dependency rules for conditional logic instead of manual DOM control
- extend `BaseStore` for your app-specific state and initialization flow
- use `BaseCompositeStore` for grouped or nested layouts

---

## Documentation

- Full reference docs: [./docs/README.md](./docs/README.md)
- Storybook: run `npm run storybook`
- Build package: `npm run build`

---

## Contributing

1. Fork the repository
2. Install dependencies with `npm install`
3. Run the dev server: `npm run dev`
4. Open Storybook with `npm run storybook`

---

## License

GPL-3.0 license

