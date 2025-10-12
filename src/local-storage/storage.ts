import localforage from "localforage";

export const lf = localforage.createInstance({
    name: "my-app",
    storeName: "app-store",
});