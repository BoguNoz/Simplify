import localforage from "localforage";

export const lf = localforage.createInstance({
    name: "simplify-engine-local-storage",
    storeName: "simplify-engine-store",
});