import { toast } from "sonner";
import { lang } from "../../text/utils/lang.ts";
import { lf } from "../storage.ts";

const text = lang();

export const dispatchStorageEvent = () => {
    window.dispatchEvent(new Event("localforage-changed"));
};

export const trimAccessElementsFromKey = (key: string) => {
    const rowLabel = key.split('-')
    return rowLabel.slice(1).join('-').slice(0, -4);
}

export async function saveToLocalStorage(key: string, data: any) {
    try {
        const randomSuffix = Math.floor(1000 + Math.random() * 9000);
        const newKey = `${key}${randomSuffix}`;
        await lf.setItem(newKey, data);
        toast.success(text.toasters.successMessages.saveToStorage);
    } catch {
        toast.error(text.toasters.errorMessages.saveToStorage);
    }
}

export async function loadFromLocalStorage(key: string) {
    try {
        return await lf.getItem(key);
    } catch {
        toast.error(text.toasters.errorMessages.loadFromStorage);
        return null;
    }
}

export async function deleteFromLocalStorage(key: string) {
    try {
        await lf.removeItem(key);
    } catch {
        toast.error(text.toasters.errorMessages.deleteFromStorage);
    }
}

async function getItemsByFilter(filterFn: (key: string) => boolean) {
    try {
        const keys = await lf.keys();
        const filteredKeys = keys.filter(filterFn);
        const values = await Promise.all(filteredKeys.map((k) => lf.getItem(k)));
        return filteredKeys.map((key, i) => ({ key, value: values[i] }));
    } catch {
        toast.error(text.toasters.errorMessages.loadFromStorage);
        return [];
    }
}

export function getAllFromLocalStorage() {
    return getItemsByFilter(() => true);
}

export function getAllWithPrefixFromLocalStorage(prefix: string) {
    return getItemsByFilter((key) => key.startsWith(prefix));
}

export async function deleteAllWithPrefixFromLocalStorage(prefix: string) {
    try {
        const keys = await lf.keys();
        await Promise.all(keys.filter((k) => k.startsWith(prefix)).map((k) => lf.removeItem(k)));
    } catch {
        toast.error(text.toasters.errorMessages.deleteFromStorage);
    }
}
