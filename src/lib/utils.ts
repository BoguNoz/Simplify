import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Checks whether a value is `null` or `undefined`.
 *
 * @param value - The value to check.
 * 
 * @returns `true` if value is `null` or `undefined`, otherwise `false`.
 */
export const isNullOrUndefined = (value: any): boolean => {
  return value === null || value === undefined;
}

/**
 * Checks whether a value is `null`, `undefined`, an empty string (`""`) or `false`.
 *
 * @remarks
 * Useful for clean conditional rendering or validating optional field values.
 *
 * @param value - The value to evaluate.
 *
 * @returns `true` if the value is null-like or falsy (except 0), otherwise `false`.
 */
export const isNullEmptyFalseOrUndefined = (value: any): boolean => {
  return isNullOrUndefined(value) || value === false || value === "";
}

/**
 * Triggers a file download for a given Blob in the browser.
 *
 * @remarks
 * - Creates a temporary `ObjectURL` for the blob.
 * - Programmatically clicks a hidden `<a>` element to start the download.
 * - Cleans up the in-memory URL shortly after.
 *
 * @param blob - The binary data to save as a file.
 * @param filename - The desired filename (e.g. `"report.pdf"`).
 *
 * @see URL.createObjectURL
 */
export const downloadBlob = (blob: Blob, filename: string) => {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.style.display = 'none';
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();

  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
