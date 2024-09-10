export function getHeightAndGutter(height: number, gutter: number) {
  return height > 0 ? height + gutter : 0;
}

export function offscreen(width: number, height = Infinity) {
  return {
    top: -9999,
    left: -9999,
    width,
    height,
  };
}
