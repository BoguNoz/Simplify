import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function isNullEmptyFalseOrUndefined(value: any): boolean {
  return value === null || value === undefined || value === "" || value === false;
}

export function getShape(arr: any): number[] {
  if (!Array.isArray(arr)) {
    return [];
  }
  const len = arr.length;
  if (len > 0 && Array.isArray(arr[0])) {
    return [len, ...getShape(arr[0])];
  }
  return [len];
}

export function getTiffShape(raster: any): [number, number] {
  if (
      raster &&
      typeof raster === 'object' &&
      typeof raster.width === 'number' &&
      typeof raster.height === 'number'
  ) {
    return [raster.height, raster.width];
  }

  return [raster.length || 0, 1];
}
export function to2DArray(arr: Float32Array, rows: number, cols: number): number[][] {
  const out: number[][] = [];
  for (let r = 0; r < rows; r++) {
    out.push(Array.from(arr.slice(r * cols, (r + 1) * cols)));
  }
  return out;
}

export function toFlatArray(arr: Float32Array): number[] {
  return Array.from(arr);
}

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