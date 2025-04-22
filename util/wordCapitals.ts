export function capitalizeWords(str: string): string {
  return str
    .split(" ")
    .map((word) => {
      const lower = word.toLowerCase();
      return word.length > 0 ? lower[0].toUpperCase() + lower.slice(1) : "";
    })
    .join(" ");
}
