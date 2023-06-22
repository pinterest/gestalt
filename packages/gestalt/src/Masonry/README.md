# How Masonry works

Broadly, Masonry works by rendering some items offscreen, measuring their heights, using those measured heights to determine layout positions, then rendering those items onscreen. This is happening constantly as the user scrolls: new items are fetched, measured, laid out, and painted to the grid.

Masonry is a very generic layout component — it knows nothing about its items, and it does not communicate anything back to them. This is why item heights cannot change after their initial render: the lack of communication means that Masonry will never know about the updated item height and remeasure that item, leading to overlaps or gaps in the grid. This is a feature, not a bug! Because Masonry is so generic, it can be used to lay out any sorts of items.

## Algorithm for classic layouts

Masonry supports five layouts: `"basic"`, `"basicCentered"`, `"flexible"`, `"serverRenderedFlexible"`, and `"uniformRow"`. However, for the layout algorithm, these can be put in three buckets: "full width" (`"flexible"` and `"serverRenderedFlexible"`), "uniform row" (`"uniformRow"`), and "default" (`"basic"`, `"basicCentered"`). Within Masonry's render method, we use three different helper functions to generate the appropriate `getPositions` function for the given layout.

### `getPositions`

Each layout helper function returns a function that takes a list of items and returns a list of positions. We assume that the items list does not change, thus we're able to match `items` and `positions` by index. We do not cache positions, but recalculate the entire visible grid on each render. We keep track of column heights using an array of length `columnCount`, where each item represents the current height of that column. For a 5-column grid, this initializes as `[0, 0, 0, 0, 0]`. The algorithm itself is quite simple: pick the left-most column of shortest height and put the item there. The first `columnCount` number of items will go in from left to right; after that, items will always slot into the shortest column. As an item is added to a column, we add the item's height to the corresponding index in the heights array.

Note that if an item does not have a measured height yet (as stored in the measurement cache), then it will return with an offscreen position. Once the item has been measured, it will be laid out in the grid.

To see how that determines actual DOM positions, let's dive into each of those helpers:

### `defaultLayout`

`packages/gestalt/src/Masonry/defaultLayout.js`
This layout yields a grid of items with a constant column width. If the width of the grid does not precisely match that of the container, then there will be additional whitespace on one or both sides of the grid (depending on `"basic"` vs `"basicCentered"`).

We determine the number of columns by taking the total width of the available area for the grid (`width` + `gutter`) and dividing by the total width of each column (`columnWidth` + `gutter`). This can be overridden by `minCols` (if specified), if the calculated number of columns is less than `minCols`.

Item positions are determined by the existing height of the target column (for `top`), and by multipling the total width of each column by the index of the column (for `left`), plus a center offset (as determined by using `"basicCentered"` vs `"basic"`).

### `uniformRowLayout`

This layout yields a grid of items in rows of uniform height. Note that Masonry does not crop or otherwise alter grid items in any way — rows will always take the height of the tallest item in the row. If item heights are not identical, there will be additional whitespace below any items shorter than the tallest item in a row.

We determine the number of columns by taking the total width of the available area for the grid (`width` + `gutter`) and dividing by the total width of each column (`columnWidth` + `gutter`). This can be overridden by `minCols` (if specified), if the calculated number of columns is less than `minCols`.

Item positions are determined by the greater of the height of the item or the existing height of the row (for `top`), and by multipling the total width of each column by the index of the column (for `left`).

### `fullWidthLayout`

This layout yields a grid of items with flexible column widths. The grid will expand or shrink (by expanding or shrinking all column widths) to accommodate the width of its container.

We determine the number of columns by first starting with a "guess" of the width divided by the `idealColumnWidth`. We then _do some math_ to determine the actual column count, and use that actual column count to determine the actual column width.

Item positions are determined by the existing height of the target column (for `top`), and by multipling the item width of each column by the index of the column, plus half the gutter width (for `left`).

---

## Component lifecycle

Before it can do much else, Masonry has to set up a couple of things:

- the measurement store, to persist measured item heights
- measure its container (as passed with the `scrollContainer` prop)

We can then get to rendering. Within the `render` method, there are three paths:

- Do we have a width for the container? If no, then another branch point:
  - Do we have pending measurements of items? (Are there items that have not yet been measured?)
    - If yes, we're hydrating from SSR. We render a static grid of placeholder items.
    - If no, we render a single 100% width div with a ref to measure the container width.
- If we do have a width for the container, then we can start laying out items.

We start by splitting out the items into two buckets: those with measurements, and those without. We use the same `getPositions` function for both buckets, but with different results: items without measurements will be positioned offscreen, items with measurements will be positioned onscreen. Offscreen items are rendered to measure heights, which are persisted in the measurement store. Onscreen items are painted to the DOM. Assuming there is a scroll container, we also include the FetchItems component to fetch more items when the user has scrolled beyond a scroll buffer (based on the container height).

The `renderMasonryComponent` method handles rendering the actual grid item. Here is also where we handle virtualization and right-to-left (RTL) language support. We use `document.dir` to determine how the item's `left` position is applied. If the item should be visible — either because there is no scroll container, or it is within the virtual bounds — then we return the positioned item, otherwise we return null. Non-virtualized grids always return the positioned item.

In addition to these layout tasks, Masonry keeps track of changes in its container size or the item references in `items`. If either changes, it reflows the grid (recalculates the layout for all items). (Note that since Masonry recalculates the layout for all items on every render anyway, this recalculation doesn't represent a performance issue — though repainting the entire grid when positions change does.)

---

## Server-side Rendering (SSR)

We use a couple of optimizations in Pinboard to improve Masonry's performance with SSR. Pinterest employees can read more about those optimizations in [this PDocs page](https://pdocs.pinadmin.com/docs/webapp/masonry-ssr).
