# Simplify

Simplify is a modular, MobX-powered UI engine for React that makes it easy to build reactive forms, data-driven panels, and composite layouts.
It translates declarative field definitions, metadata, and dependency rules into live UI and state logic so you can focus on what your interface should do, not how it should wire itself.

- Reactive form state with MobX
- Declarative field and composite configuration
- Built-in dependency and validation flow
- Tailwind + Radix + Shadcn-inspired UI components

---

## Install

```bash
npm install @bogunoz/simplify
```

> Peer dependencies: `react`, `react-dom`, `mobx`, `mobx-react-lite`

---

## Why Simplify

Use Simplify when you want to build interfaces that adapt automatically to user input and configuration.
It is especially valuable for:

- admin dashboards and settings forms
- dynamic configuration screens
- multi-step forms with conditional UI
- reusable composite layouts and partials

Simplify reduces boilerplate by moving form structure into data models and using MobX to keep UI and state synchronized.

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

