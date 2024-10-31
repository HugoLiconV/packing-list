export function generateId(): string {
  // Use crypto API if available
  if (typeof window !== "undefined" && window.crypto) {
    const array = new Uint32Array(1);
    window.crypto.getRandomValues(array);
    return array[0].toString(36);
  }

  // Fallback to Math.random()
  return Math.random().toString(36).substring(2, 9);
}
