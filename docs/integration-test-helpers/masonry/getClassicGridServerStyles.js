// @flow strict

// USE WITH CAUTION
// This file needs to be migrated from Pinboard: app/packages/gestaltExtensions/Masonry/styles/getClassicGridServerStyles.js
// For now, make sure that it stays in sync with the original file

export default function getClassicGridServerStyles({
  isRTL = false,
  itemWidth = 236,
  maxColumns = 16,
  minColumns = 2,
}: {
  isRTL?: boolean,
  itemWidth: number,
  maxColumns: number,
  minColumns: number,
}): string {
  let styles = `
.gridCentered {
  margin-left: auto;
  margin-right: auto;
}
.gridCentered .static {
  position: absolute;
  visibility: hidden;
}
`;

  for (let i = minColumns; i < maxColumns + 1; i += 1) {
    const minWidth = i === minColumns ? 0 : i * itemWidth;
    styles += `
@media (min-width: ${minWidth}px) and (max-width: ${(i + 1) * itemWidth - 1}px) {
  .gridCentered {
    width: ${i * itemWidth}px;
  }
  .gridCentered .static:nth-child(-n+${i}) {
    position: static !important;
    visibility: visible !important;
    float: ${isRTL ? 'right' : 'left'};
    display: block;
  }
}
`;
  }

  return styles;
}
