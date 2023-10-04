// @flow strict
import { CompositeZIndex, FixedZIndex } from 'gestalt';

interface Indexable {
  index(): number;
}

export const PAGE_HEADER_ZINDEX: Indexable = new FixedZIndex(10);
export const ABOVE_PAGE_HEADER_ZINDEX: Indexable = new CompositeZIndex([PAGE_HEADER_ZINDEX]);
export const SKIP_TO_CONTENT_ZINDEX: Indexable = new CompositeZIndex([ABOVE_PAGE_HEADER_ZINDEX]);

// Z-index to use for any popovers on the Header
export const PAGE_HEADER_POPOVER_ZINDEX = ABOVE_PAGE_HEADER_ZINDEX;

export const TOOLTIP_ZINDEX: CompositeZIndex = new CompositeZIndex([ABOVE_PAGE_HEADER_ZINDEX]);
