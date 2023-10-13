// @flow strict

// USE WITH CAUTION
// This file needs to be migrated from Pinboard: app/packages/gestaltExtensions/Masonry/styles/getFlexibleGridServerStyles.js
// For now, make sure that it stays in sync with the original file

export default function getFlexibleGridServerStyles({
  isRTL = false,
  maxItemWidth = 300,
  maxColumns = 16,
  minColumns = 2,
}: {
  isRTL?: boolean,
  maxItemWidth: number,
  maxColumns: number,
  minColumns: number,
}): string {
  let styles = `
.gridCentered {
  margin-left: auto;
  margin-right: auto;
  max-width: ${maxColumns * maxItemWidth}
}

.gridCentered .static {
  position: absolute !important;
  visibility: hidden !important;
}

@media (min-width: ${maxColumns * maxItemWidth}px) {
  .gridCentered .static:nth-child(-n+${maxColumns}) {
    position: static !important;
    visibility: visible !important;
    float: ${isRTL ? 'right' : 'left'};
    display: block;
  }

  .gridCentered .static:nth-child(-n+${maxColumns}) {
    position: static !important;
    visibility: visible !important;
    float: ${isRTL ? 'right' : 'left'};
    display: block;
  }

  .gridCentered .static {
    width: ${maxItemWidth}px !important;
  }
}
`;

  for (let i = minColumns; i < maxColumns + 1; i += 1) {
    const minWidth = i === minColumns ? 0 : (i - 1) * maxItemWidth + 1;
    styles += `
@media (min-width: ${minWidth}px) and (max-width: ${i * maxItemWidth}px) {
  .gridCentered .static:nth-child(-n+${i}) {
    position: static !important;
    visibility: visible !important;
    float: ${isRTL ? 'right' : 'left'};
    display: block;
  }

  .gridCentered .static {
    width: calc(100% / ${i}) !important;
  }
}
`;
  }

  return styles;
}
