export const getRgbDarkned = (selectedColor: string): string | undefined => {
  const rgbMatch = selectedColor.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/);
  if (rgbMatch) {
    const [r, g, b] = rgbMatch.slice(1).map(Number);

    const darkenedR = Math.max(0, r * 0.8);
    const darkenedG = Math.max(0, g * 0.8);
    const darkenedB = Math.max(0, b * 0.8);

    return `rgb(${Math.round(darkenedR)}, ${Math.round(darkenedG)}, ${Math.round(darkenedB)})`;
  }
};
