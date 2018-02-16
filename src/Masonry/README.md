## Masonry

**The following is a WIP spec for where the Masonry code is headed. Is not representative of the current codebase**

Description of Masonry rendering algorithm.

`Masonry Specification`

let `ITEMS_PER_INSERTION` be an integer describing the number of items to insert per frame. Defaults to 1.

`CalculateItemPosition()`

New position is defined as { column, top, left, bottom} where:
 * `column` = measurementStore.getShortestColumn()
 * `top` = measurementStore.getColumnHeight(column)
 * `left` = `column` * this.itemWidth
 * `bottom` = `top` + itemHeight + this.gutterWidth;

`ItemRefCallback(ref:HTMLElement, itemKey:string)`

1. If `ItemMeasurementStore` does not contain measurement
    1. Measure the ref HTMLElement
    2. Update `ItemMeasurementStore` with the height of the element.
2. If `ItemPositionStore` does not contain position,
    1. Run `CalculateItemPosition` to get the position of the item.
    2. Update `ItemPositionStore` with the calculated item position.
3. Remove the item entry from `state.pendingMeasurementItems`.
4. Add the item entry to `state.gridItems` via `setState`


let `state` = {
  gridItems: Array<GridItemType>,
  pendingMeasurementItems: Array<ItemType>,
  pendingInsertionMeasurementItems: Array<{itemType, columnIdx, rowIdx}>
};

let `props` = {
  items: Array<ItemType>,
};

`Masonry Lifecycle`
1. Masonry Server Render and Hydration
    1. constructor()
        1. Set `this.insertedItemPointer` equal to the length of `props.items`.
    2. render()
        1. Map over `state.gridItems` until reaching an index equal to `this.itemRefPointer` and render all items as `ComponentWrapper` instances.
        2. Specify `ItemRefCallback` as a ref for each `ComponentWrapper`.
2. (Client Hydration) render()
    1. Item ref callback fires for each item.
    2. componentDidUpdate()
    3. loadMoreItems()
        1. Additional items are populated in the `items` prop.
        2. componentWillReceiveProps()
            1. Compare `newProps.items` against `this.props.items`
            2. If anything is different between the items, reflow the grid
            3. If new items have been inserted, call `insertItems` with `newProps.items.slice(this.insertedItemPointer)`
    4. insertItems(nextItems)
        1. Let `newItems` be a slice of `nextItems` from 0 to `MAX_ITEMS_PER_INSERTION`
        2. Increase `this.insertedItemPointer` by length of `newItems`
        2. Append new items into `state.pendingMeasurementItems` via `setState`
        3. render()
            1. Render all items in `state.pendingMeasurementItems` inside a `ComponentWrapper` with visibility of hidden.
            2. Render all items in `state.pendingInsertionMeasurementItems` inside a `ComponentWrapper` with visibility of hidden.
            2. `ItemRefCallback` is called for each item in `state.pendingMeasurementItems` and `state.pendingInsertionMeasurementItems`
        4. `ItemRefCallback`
            1. Updates measurements/positions
            2. Updates `state.gridItems` and `state.pendingMeasurementItems`
            3. render()
        5. setStateCallback - call insertItems() with `this.props.items.slice(this.insertedItemPointer)` on the next frame

`ItemPositionStore`
1. `updateColumnHeight`
    1. If inserting into a row before the current position in column
        1. Update all following item positions.
2. `setItemPosition`
  1. Sets item position in the store for a given key and position.

`this.props.layout`

if no `layout` prop is passed then `this.props.layout` will default to `'masonry'`

Options:
* `<Masonry layout='masonry' ... />` 

    default masonry layout

* `<Masonry layout='maxHeightRows' ... />` 
    
    each row's height matches the height of the tallest item in that row
