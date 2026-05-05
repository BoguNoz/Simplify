import { defineConfig } from "tsup";

export default defineConfig({
    injectStyle: true,
    entry: {
        index: "src/index.ts",
        engine: "src/engine/index.ts",
        stores: "src/stores/index.ts",
        components: "src/components/index.ts",
        events: "src/events/index.ts",
        lib: "src/lib/index.ts",
        models: "src/models/index.ts",
        services: "src/services/index.ts",
    },

    dts: true,
    format: ["esm", "cjs"],
    outDir: "dist",
    clean: true,
    sourcemap: true,
    splitting: true,
    bundle: true,

    outExtension: ({ format }) => ({
        js: format === "esm" ? ".js" : ".cjs",
    }),

    external: [
        "react",
        "react-dom",
        "mobx",
        "mobx-react-lite",
    ],

    loader: {
        '.css': 'local-css',
    },

    minify: false,
});