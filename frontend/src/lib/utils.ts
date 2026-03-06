export function cn(...inputs) {
  return inputs
    .flatMap((entry) => (Array.isArray(entry) ? entry : [entry]))
    .filter(Boolean)
    .join(" ");
}
