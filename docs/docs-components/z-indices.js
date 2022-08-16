// @flow strict
import { CompositeZIndex, FixedZIndex } from 'gestalt';

export const PAGE_HEADER_ZINDEX: FixedZIndex = new FixedZIndex(10);
export const ABOVE_PAGE_HEADER_ZINDEX: CompositeZIndex = new CompositeZIndex([PAGE_HEADER_ZINDEX]);
// Z-index to use for any popovers on the Header
export const PAGE_HEADER_POPOVER_ZINDEX = ABOVE_PAGE_HEADER_ZINDEX;
