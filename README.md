# Simplify

Simplify is a reactive, data-driven UI engine built on MobX, enabling rapid form and component composition using declarative field configurations and dependency logic.
It abstracts away manual UI wiring: you describe your form in plain data (e.g. JSON or a JavaScript object) and Simplify generates the UI.

Simplify is built on MobX, so it offers full reactivity: any change in the underlying data instantly updates the UI. 
For example, if one field depends on another (say, a “Can Vote?” checkbox appears only when age >= 18).
Simplify lets you express that dependency in the config, and MobX’s observable/computed system keeps everything in sync. 
In other words, whenever the data changes, the appropriate parts of the UI update automatically



## Key Features
- **Declarative Schemas:** Define your entire form or component layout in JSON/JS configuration, not in imperative code. Simplify reads this schema and instantiates fields and components accordingly.
- **Reactive State Management:** Built on MobX, so your UI stays up-to-date with minimal code. As noted by RisingStack, MobX “allows React components to update automatically when the data they depend on changes”. Simplify leverages this for real-time updates (cf. “MobX-powered reactivity”).
- **Dependency Logic:** Fields can depend on each other or on computed values. You can specify conditions or computed expressions in the schema, and Simplify will use MobX reactions to re-compute those fields automatically.
- **Minimal Boilerplate:** No need for manual event handlers or state wiring. Simplify’s “JSON-first” engine means you focus on what the form is, not how it works internally. This leads to “Less Code, Fewer Bugs” because the data model and UI are loosely coupled.


## Usage Example

Here’s a simple example of defining a form with fields and a dependency. The schema below declares three fields: First Name, Age, and Is Adult?. The isAdult field only appears when age >= 18.

```ts
registeredFields = {
    firstName = "firstName",
    age = "age",
    isAdult = "isAdult",
}

const fields = createFieldPlaceholders(registeredFields, text.form);

field.firstName.fieldType = BaseFieldTypesEnum.Input;

field.age.fieldType = BaseFieldTypesEnum.Input;

field.isAdult.fieldType = BaseFieldTypesEnum.CheckBox;
field.isAdult.dependencies = [
    { fieldId: registeredFields.age, events: [(target: string, master: string, store: BaseStore) => {
          const field = store.fields[target];
          const value = store.getFieldValue(master);

          field.isDisabled = value < 18;
    ] },
]

export const form = buildFields(fields);
```

You can also attach validation or other operations to a field, which are automatically managed by the engine.

```ts
// Simple intager validator
field.age.validators = [isInteger]
```

The examples above only scratch the surface — Simplify provides a wide range of advanced capabilities for building fully dynamic, reactive UIs.



## Architecture

Under the hood, Simplify builds a MobX-powered data model from your schema. Each field is represented by a MobX observable (or computed) value, and the rendered UI components bind to those values.
This is similar to an MVVM pattern: the “view” (React component) automatically reflects the state of the “view-model” (MobX store) without manual updates. 
As one author explains, MobX “provides automatic observing and computed” values, enabling seamless reactive UIs.

Because Simplify uses MobX’s core mechanisms, updates happen synchronously and efficiently. 
When any piece of data changes, MobX triggers only the necessary re-renders, so your form stays consistent in real time. 
The declarative schema is parsed into this reactive state at initialization, meaning you rarely write imperative code. 
As a result, your app logic lives alongside your data definitions (not tangled in UI code), echoing the idea of separating logic and UI to reduce complexity.






