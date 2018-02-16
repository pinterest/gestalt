// Generate initial server styles for the grid.
let styles = '';
const minColumns = 3;
const maxColumns = 10;
const maxItemWidth = 300;
let minWidth = 0;
let maxWidth = minColumns * maxItemWidth - 1;

for (let i = minColumns; i < maxColumns + 1; i += 1) {
  styles += `
@media (min-width: ${minWidth}px) and (max-width: ${maxWidth}px) {
    .static:nth-child(-n+${i}) {
        visibility: visible;
        width: calc(100% / ${i});
        display: inline-block;
    }
}

`;
  minWidth = maxWidth + 1;
  maxWidth += maxItemWidth;
}
styles += `
.static {
    visibility: hidden;
}
`;

const exportStyles = styles;

export default exportStyles;
