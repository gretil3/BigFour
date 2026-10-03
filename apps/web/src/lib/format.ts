/** 1 → "01", for the design's numbered labels. */
export function formatIndex(value: number): string {
  return String(value).padStart(2, '0');
}
