import { defineConfig } from "tsup";

export default defineConfig({
    entry: {
        index: "src/index.ts",
        engine: "src/engine/index.ts",
        stores: "src/stores/index.ts",
        ui: "src/components/ui/index.ts",
        layout: "src/components/layout/index.ts",
    },
    format: ["esm", "cjs"],
    dts: false,
    outDir: "dist",
    clean: true,
    splitting: false,
    outExtension: ({ format }) => ({
        js: format === "esm" ? ".js" : ".cjs",
    }),
});