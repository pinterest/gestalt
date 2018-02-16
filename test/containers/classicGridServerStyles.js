// Generate initial server styles for the grid.
let styles = '';
const minColumns = 3;
const maxColumns = 10;
const itemMargin = 14;
const itemWidth = 250;
let minWidth = 0;
let maxWidth = minColumns * itemWidth + itemWidth - 1;

for (let i = minColumns; i < maxColumns + 1; i += 1) {
  styles += `
@media (min-width: ${minWidth}px) and (max-width: ${maxWidth}px) {
    .static:nth-child(-n+${i}) {
        float: left;
        position: static;
        visibility: visible;
        margin: 0 ${itemMargin / 2}px;
    }
    .gridCentered {
        width: ${i * itemWidth}px;
    }
}

`;
  minWidth = maxWidth + 1;
  maxWidth += itemWidth;
}
styles += `
.static {
    position: absolute;
    visibility: hidden;
}
.gridCentered {
    margin: 0 auto;
}
`;

const exportStyles = styles;

export default exportStyles;
