// src/index.ts
// ────────────────────────────────────────────────
// CORE / ENGINE / STORES / MODELS / UTILS
// ────────────────────────────────────────────────

// Engine + auto-register
export * from "./engine/components/composite";
export * from "./engine/components/metadata-context";
export * from "./engine/registres/auto-register";
export * from "./engine/registres/change-registry";

// Stores
export * from "./stores/base-composite-store";
export * from "./stores/base-store";
export * from "./stores/utils/composite-store-utils";

// Models + Enums
export * from "./models/base-composite-interface";
export * from "./models/base-composite-model";
export * from "./models/base-field-interface"
export * from "./models/base-field-model";
export * from "./models/metadata-model";
export * from "./models/enums/base-field-type-enum";
export * from "./models/enums/base-response-type-enum";

// Utils & helpers
export * from "./lib/base-model-utils";
export * from "./lib/base-composite-model-utils";
export * from "./lib/metadata-model-utils";
export * from "./lib/local-storage/utils/local-storage-utils";

// Events
export * from "./events/dependency";
export * from "./events/operation";
export * from "./events/render";
export * from "./events/validator";

// Services
export * from "./services/base-service";