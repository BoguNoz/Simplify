import { toast } from "sonner";
import { lang } from "@core/text/utils/lang";
import { lf } from "../storage";

const text = lang();

export const dispatchStorageEventName = "localforage-changed"

/**
 * Dispatches a global event to notify listeners that the localforage storage has changed.
 *
 * @remarks
 * This can be used to trigger UI updates or data synchronization between browser tabs.
 */
export const dispatchStorageEvent = () => {
    window.dispatchEvent(new Event(dispatchStorageEventName));
};

/**
 * Removes automatically generated access suffixes from a storage key.
 *
 * @param key - The original storage key with suffix.
 * @returns The trimmed key name without suffix.
 */
export const trimAccessElementsFromKey = (key: string) => {
    const rowLabel = key.split('-')
    return rowLabel.slice(1).join('-').slice(0, -4);
}


/**
 * Saves an item to local storage under a unique key.
 *
 * @param key - Base key name for the entry.
 * @param data - The data object to be saved.
 * @remarks
 * - A random numeric suffix (1000–9999) is appended to the key to ensure uniqueness.
 * - Displays a toast message indicating success or failure.
 */
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

/**
 * Loads an item from local storage.
 *
 * @param key - The key of the stored item.
 * @returns The stored data, or `null` if loading failed.
 * @remarks
 * - Displays a toast message if the operation fails.
 */
export async function loadFromLocalStorage(key: string) {
    try {
        return await lf.getItem(key);
    } catch {
        toast.error(text.toasters.errorMessages.loadFromStorage);
        return null;
    }
}

/**
 * Deletes an item from local storage.
 *
 * @param key - The key of the item to delete.
 * @remarks
 * - Displays a toast message if the operation fails.
 */
export async function deleteFromLocalStorage(key: string) {
    try {
        await lf.removeItem(key);
    } catch {
        toast.error(text.toasters.errorMessages.deleteFromStorage);
    }
}

/**
 * Retrieves all local storage items that match a given filter function.
 *
 * @param filterFn - A function that determines which keys to include.
 * @returns An array of objects with `{ key, value }` pairs.
 * @private
 */
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

/**
 * Retrieves all items stored in local storage.
 *
 * @returns An array of `{ key, value }` objects.
 */
export function getAllFromLocalStorage() {
    return getItemsByFilter(() => true);
}

/**
 * Retrieves all items whose keys start with a given prefix.
 *
 * @param prefix - The prefix string to filter by.
 * @returns An array of `{ key, value }` objects.
 */
export function getAllWithPrefixFromLocalStorage(prefix: string) {
    return getItemsByFilter((key) => key.startsWith(prefix));
}

/**
 * Deletes all items whose keys start with a given prefix.
 *
 * @param prefix - The prefix string to filter keys for deletion.
 * @remarks
 * - Displays a toast message if the operation fails.
 */
export async function deleteAllWithPrefixFromLocalStorage(prefix: string) {
    try {
        const keys = await lf.keys();
        await Promise.all(keys.filter((k) => k.startsWith(prefix)).map((k) => lf.removeItem(k)));
    } catch {
        toast.error(text.toasters.errorMessages.deleteFromStorage);
    }
}