import type { Node } from "react";
import { Component as ReactComponent } from "react";
import type { DebounceReturn } from "./debounce";
import ScrollContainer from "./Masonry/ScrollContainer";
import type { ThrottleReturn } from "./throttle";
import type { Cache } from "./Masonry/Cache";
import "./Masonry/Cache";
import MeasurementStore from "./Masonry/MeasurementStore";
declare type Position = {
    top: number;
    left: number;
    width: number;
    height: number;
};
declare type Layout = "basic" | "basicCentered" | "flexible" | "serverRenderedFlexible" | "uniformRow";
declare type Props<T> = {
    /**
     * The preferred/target item width. If 'flexible' is set, the item width will
     * grow to fill column space, and shrink to fit if below min columns.
     */
    columnWidth?: number;
    /**
     * The amount of vertical and horizontal space between each item, specified in pixels.
     */
    gutterWidth?: number;
    /**
     * An array of items to display that contains the data to be rendered by `renderItem()` (fallback to the deprecated `<Item />` if `renderItem` is not passed).
     */
    items: ReadonlyArray<T>;
    /**
     * `basic`: Left aligned masonry layout.
     * `basicCentered`: Center aligned masonry layout.
     * `flexible`: Item width grows to fill column space and shrinks to fit if below min columns.
     * `serverRenderedFlexible`: Item width grows to fill column space and shrinks to fit if below min columns. Main differerence with `flexible` is that we do not store the initial measurement. More context in [#2084](https://github.com/pinterest/gestalt/pull/2084)
     * `uniformRow`: Items are laid out in a single row, with all items having the same height.
     */
    layout?: Layout;
    /**
     * A callback which the grid calls when we need to load more items as the user scrolls.
     * The callback should update the state of the items, and pass those in as props
     * to this component.
     * Note that `scrollContainer` must be specified.
     */
    loadItems?: false | ((arg0: {
        from: number;
    } | null | undefined) => void | boolean | {});
    /**
     * Masonry internally caches item sizes/positions using a measurement store. If `measurementStore` is provided, Masonry will use it as its cache and will keep it updated with future measurements. This is often used to prevent re-measurement when users navigate away and back to a grid. Create a new measurement store with `Masonry.createMeasurementStore()`.
     */
    measurementStore?: Cache<T, any>;
    /**
     * Minimum number of columns to display.
     */
    minCols: number;
    /**
     * A function that renders the item you would like displayed in the grid. This function is passed three props: the item's data, the item's index in the grid, and a flag indicating if Masonry is currently measuring the item.
     */
    renderItem: (arg0: {
        readonly data: T;
        readonly itemIdx: number;
        readonly isMeasuring: boolean;
    }) => Node;
    /**
     * A function that returns a DOM node that Masonry uses for on-scroll event subscription. This DOM node is intended to be the most immediate ancestor of Masonry in the DOM that will have a scroll bar; in most cases this will be the `window` itself, although sometimes Masonry is used inside containers that have `overflow: auto`. `scrollContainer` is optional, although it is required for features such as `virtualize` and `loadItems`.
     * This is required if the grid is expected to be scrollable.
     */
    scrollContainer?: () => HTMLElement;
    /**
     * If `virtualize` is enabled, Masonry will only render items that fit in the viewport, plus some buffer. `virtualBoundsBottom` allows customization of the buffer size below the viewport, specified in pixels.
     */
    virtualBoundsBottom?: number;
    /**
     * If `virtualize` is enabled, Masonry will only render items that fit in the viewport, plus some buffer. `virtualBoundsTop` allows customization of the buffer size above the viewport, specified in pixels.
     */
    virtualBoundsTop?: number;
    /**
     * If `virtualize` is enabled, Masonry will only render items that fit in the viewport, plus some buffer. `virtualBufferFactor` allows customization of the buffer size, specified as a multiplier of the container height. It specifies the amount of extra buffer space for populating visible items. For example, if `virtualBufferFactor` is 2, then Masonry will render items that fit in the viewport, plus 2x the viewport height.
     */
    virtualBufferFactor?: number;
    /**
     * Specifies whether or not Masonry dynamically adds/removes content from the grid based on the user's viewport and scroll position. Note that `scrollContainer` must be specified when virtualization is used.
     */
    virtualize?: boolean;
};
declare type State<T> = {
    hasPendingMeasurements: boolean;
    isFetching: boolean;
    items: ReadonlyArray<T>;
    measurementStore: Cache<T, number>;
    scrollTop: number;
    width: number | null | undefined;
};
/**
 * [Masonry](https://gestalt.pinterest.systems/web/masonry) creates a deterministic grid layout, positioning items based on available vertical space. It contains performance optimizations like virtualization and support for infinite scrolling.
 *
 * ![Masonry light mode](https://raw.githubusercontent.com/pinterest/gestalt/master/playwright/visual-test/Masonry.spec.mjs-snapshots/Masonry-chromium-darwin.png)
 *
 */
export default class Masonry<T extends {}> extends ReactComponent<Props<T>, State<T>> {
    static createMeasurementStore<T1 extends {}, T2>(): MeasurementStore<T1, T2>;
    /**
     * Delays resize handling in case the scroll container is still being resized.
     */
    handleResize: DebounceReturn;
    updateScrollPosition: ThrottleReturn;
    measureContainerAsync: DebounceReturn;
    containerHeight: number;
    containerOffset: number;
    gridWrapper: HTMLElement | null | undefined;
    insertAnimationFrame: number;
    measureTimeout: number;
    scrollContainer: ScrollContainer | null | undefined;
    static defaultProps: {
        columnWidth?: number;
        layout?: Layout;
        loadItems?: false | ((arg0: {
            from: number;
        } | null | undefined) => void | boolean | {});
        minCols: number;
        virtualBufferFactor: number;
        virtualize?: boolean;
    };
    constructor(props: Props<T>);
    /**
     * Adds hooks after the component mounts.
     */
    componentDidMount(): void;
    componentDidUpdate(prevProps: Props<T>, prevState: State<T>): void;
    /**
     * Remove listeners when unmounting.
     */
    componentWillUnmount(): void;
    static getDerivedStateFromProps<K>(props: Props<K>, state: State<K>): null | {
        hasPendingMeasurements: boolean;
        isFetching?: boolean;
        items: ReadonlyArray<K>;
    };
    setGridWrapperRef: (ref: HTMLElement | null | undefined) => void;
    setScrollContainerRef: (ref: ScrollContainer | null | undefined) => void;
    fetchMore: () => void;
    measureContainer(): void;
    /**
     * Clear measurements/positions and force a reflow of the entire grid.
     * Only use this if absolutely necessary - ex: We need to reflow items if the
     * number of columns we would display should change after a resize.
     */
    reflow(): void;
    renderMasonryComponent: (itemData: T, idx: number, position: Position) => Node;
    role: string;
    style: {};
}
export {};
