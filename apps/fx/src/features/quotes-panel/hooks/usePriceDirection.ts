export function usePriceDirection(current?: number, previous?: number): "up" | "down" | "none" {
  if (current == null || previous == null) return "none";
  if (current > previous) return "up";
  if (current < previous) return "down";
  return "none";
}
