import { getIsFlexibleLayout } from './getLayoutAlgorithm';
import { Layout } from './types';

export const FULL_WIDTH_LAYOUT_DEFAULT_IDEAL_COLUMN_WIDTH = 240;
export const FULL_WIDTH_DEFAULT_GUTTER = 0;
export const DEFAULT_LAYOUT_DEFAULT_COLUMN_WIDTH = 236;
export const DEFAULT_LAYOUT_DEFAULT_GUTTER = 14;

export default function getColumnCount({
  gutter,
  columnWidth,
  width,
  minCols,
  layout,
}: {
  gutter: number;
  columnWidth: number | undefined;
  width: number;
  minCols: number;
  layout: Layout;
}): number {
  if (getIsFlexibleLayout({ layout, width }) || layout === 'uniformRowFlexible') {
    // "This is kind of crazy!" - you
    // Yes, indeed. The "guessing" here is meant to replicate the pass that the
    // original implementation takes with CSS.
    const idealColumnWidth = columnWidth ?? FULL_WIDTH_LAYOUT_DEFAULT_IDEAL_COLUMN_WIDTH;
    const idealGutter = gutter ?? FULL_WIDTH_DEFAULT_GUTTER;
    const colguess = Math.floor(width / idealColumnWidth);
    return Math.max(Math.floor((width - colguess * idealGutter) / idealColumnWidth), minCols);
  }

  const idealGutter = gutter ?? DEFAULT_LAYOUT_DEFAULT_GUTTER;
  const idealColumnWidth = columnWidth ?? DEFAULT_LAYOUT_DEFAULT_COLUMN_WIDTH;
  const columnWidthAndGutter = idealColumnWidth + idealGutter;
  return Math.max(Math.floor((width + idealGutter) / columnWidthAndGutter), minCols);
}
